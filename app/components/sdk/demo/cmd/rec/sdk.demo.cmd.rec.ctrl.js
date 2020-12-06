(function () {

	var app = angular.module('atControllers');

	app.controller('SdkDemoCmdRecCtrl', ['$routeParams', '$location', '$rootScope', '$scope', '$sdkObjTypeSvc', '$sdkDeviceSvc', '$sdkXmlSvc',
		function ($routeParams, $location, $rootScope, $scope, $sdkObjTypeSvc, $sdkDeviceSvc, $sdkXmlSvc) {
		"use strict";

		var vm = this;
		var recCmdTbl = [{
				label: "Read",
				cmd: "read",
				editEnable: false,
				checkEnable: true,
				idMaxEnable: true
			},
			{
				label: "Write",
				cmd: "write",
				editEnable: true,
				checkEnable: true,
				idMaxEnable: false
			},
			{
				label: "Add",
				cmd: "add",
				editEnable: true,
				checkEnable: true,
				idMaxEnable: false
			},
			{
				label: "Delete",
				cmd: "delete",
				editEnable: false,
				checkEnable: false,
				idMaxEnable: true
			},
			{
				label: "Get info",
				cmd: "info",
				editEnable: false,
				checkEnable: false,
				idMaxEnable: false
			}
		];

		function initialize() {
			$rootScope.$broadcast("SdkDemoCmdRecCtrl::init");
			$rootScope.$broadcast("SdkDemoCmdRecCtrl::objTypeItemSelected", null);
			initObj();
			$sdkXmlSvc.sdkParserCallbackRegister($sdkDeviceSvc.onSdkItemParse);
			vm.loading = false;
		}

		function initObj() {
			vm.obj = {
				objType: null,
				cmd: null,
				rec: null,
				idMin: 0,
				idMax: 0,
				serial: $sdkXmlSvc.getSetTargetSerial()
			};
			vm.data = {
				editEnable: false,
				checkEnable: false,
				objId: []
			}
		}

		function onSearchUpdate(e, searchText) {
			vm.searchText = searchText;
		}

		function onShowMe(e) {
			vm.show = true;
		}

		function onObjTypeSelected(e, objType) {
			if (null != objType) {
				vm.obj.objType = objType;
				vm.obj.idMin = 0;
                vm.obj.idMax = 0;
                vm.obj.syncCnt = 0;
                vm.obj.checkSyncCnt = false;
				selectRecType(undefined, true);
				selectCmd();
			}
			vm.show = true;
		}

		function getRecCmd(cmd) {
			if (cmd === undefined){
				cmd = vm.obj.cmd;
			}
			for (var i = 0; i < recCmdTbl.length; i++) {
				if (cmd == recCmdTbl[i].cmd) {
					return recCmdTbl[i];
				}
			}
			return null;
		}

		function updateDataWatch() {
			var objTypeTag = null;
			if (vm.obj.objType) {
				objTypeTag = vm.obj.objType.objTypeTag;
			}
			var recTag = null;
			if (vm.obj.rec) {
				recTag = vm.obj.rec.recTag;
			}
			return $sdkDeviceSvc.getObjId(vm.obj.serial, objTypeTag, recTag, vm.obj.idMin);
		}

		var updateData = function() {
			vm.data.editEnable = true;
			vm.data.checkEnable = true;
			vm.data.objId = [];
			if (vm.obj.idMin > vm.obj.idMax){
				vm.obj.idMax = vm.obj.idMin;
			}
			vm.serialList = $sdkDeviceSvc.getDeviceListByMaster($sdkXmlSvc.getSetTargetSerial());

			if (null != vm.obj.rec) {
				var objId = updateDataWatch();
				if (null != objId) {
					for (var tag in objId) {
						var tagInfo = $sdkObjTypeSvc.getTagName(vm.obj.objType.objTypeTag, vm.obj.rec.recTag, tag);
						if (null != tagInfo) {
							var metadata = {
								tagName: tag,
								dataTbl: objId[tag],
								label: tagInfo.label,
								desc: tagInfo.desc,
								size: tagInfo.size,
								disp: tagInfo.disp,
								check: false
							};
							vm.data.objId.push(metadata);
						}
					}
				}

				var recCmd = getRecCmd();
				if (null != recCmd) {
					vm.data.editEnable = recCmd.editEnable;
					vm.data.checkEnable = recCmd.checkEnable;
				}
			}

			$rootScope.$broadcast("SdkDemoCmdRecCtrl::objTypeItemSelected", vm.data);
		}
		var close = function () {
			initialize();
		}
		var numItemGet = function () {
			return vm.numRecGet() + vm.numCmdGet();
		}
		var numRecGet = function () {
			if (null != vm.obj.objType) {
				if (null != vm.obj.objType.objRecTbl) {
					return vm.obj.objType.objRecTbl.length;
				}
			}
			return 0;
		}
		var numCmdGet = function () {
			if (null != vm.obj.objType) {
				if (null != vm.obj.objType.objCmdTbl) {
					return vm.obj.objType.objCmdTbl.length;
				}
			}
			return 0;
		}
		var selectedState = function () {
			if (null != vm.obj.objType) {
				return true;
			}
			return false;
		}
		var objTypeNameGet = function () {
			if (null != vm.obj.objType) {
				return vm.obj.objType.name;
			}
			return null;
		}
		var objTypeDescGet = function () {
			if (null != vm.obj.objType) {
				return vm.obj.objType.desc;
			}
			return null;
		}
		var objTypeTagGet = function () {
			if (null != vm.obj.objType) {
				return vm.obj.objType.objTypeTag;
			}
			return null;
		}
		var numObjIdGet = function () {
			if (null != vm.obj.objType) {
				var max = $sdkDeviceSvc.getSetObjIdMax(vm.obj.serial, vm.obj.objType.objTypeTag);
				if (max > 0){
					max--;
				}
				return max;
			}
			return null;
		}
		var showObjIdMax = function () {
			if (null != vm.obj.objType) {
				if (vm.obj.objType.numObjIdDflt > 1){
					if ((null == getRecCmd(vm.obj.cmd)) ||
					    ("read" == vm.obj.cmd) ||
						("delete" == vm.obj.cmd)) {
						return true;
					}
				}
			}
			return false;
        }
		var showSyncCnt = function () {
			if (null != vm.obj.objType) {
			    if ("read" == vm.obj.cmd) {
					return true;
				}
			}
			return false;
		}

		var selectObjType = function () {
			$rootScope.$broadcast("SdkDemoCmdRecCtrl::selectObjType");
			$rootScope.$broadcast("SdkDemoCmdRecCtrl::objTypeItemSelected", null);
			vm.show = false;
		}

		var selectCmd = function (cmd, rec) {
			if (undefined == cmd) {
				if (vm.numRecGet() > 0) {
					cmd = recCmdTbl[0].cmd;
				} else if (vm.numCmdGet() > 0) {
					cmd = vm.obj.objType.objCmdTbl[0].recTag;
				}
			}
			if ((undefined != cmd) &&
				(null != cmd)) {
				if ((null == getRecCmd(vm.obj.cmd)) &&	// detect transition from cmd to rec
					(null != getRecCmd(cmd))){
					selectRecType(undefined, true);					// set default record data
				}
				vm.obj.cmd = cmd;
			}
			if ((undefined != rec) &&
				(null != rec)) {
				vm.obj.rec = rec;
			}
			updateData();
		}

		var selectRecType = function (rec, noUpdate) {
			if (undefined == rec) {
				if (vm.numRecGet() > 0) {
					rec = vm.obj.objType.objRecTbl[0];
				} else if (vm.numCmdGet() > 0) {
					rec = vm.obj.objType.objCmdTbl[0];
				}
			}
			if ((undefined != rec) &&
				(null != rec)) {
				vm.obj.rec = rec;
			}
			if (noUpdate === undefined){
				updateData();
			}
		}

		var cmdNameGet = function () {
			var recCmd = getRecCmd();
			if (null != recCmd) {
				return "Record: " + recCmd.label;
			} else if (null != vm.obj.rec) {
				return "Command: " + vm.obj.rec.label;
			}
			return null;
		}
		var itemDescGet = function () {
			if (null != vm.obj.rec) {
				return vm.obj.rec.desc;
			}
			return null;
		}
		var recTypeNameGet = function () {
			if (null != vm.obj.rec) {
				return vm.obj.rec.label;
			}
			return null;
		}
		var isRecSelected = function () {
			var recCmd = getRecCmd();
			if (null != recCmd) {
				return true;
			}
			return false;
		}
		var urlGet = function () {
			var url = $sdkXmlSvc.getSetBaseUrl();
			url = url + "sdk.xml";
			return url;
		}

		function onPostResult(data) {
			updateData();
			vm.loading = false;
		}

		var submit = function () {
			var rqst = {
				cmd: vm.obj.cmd,
				recTag: vm.obj.rec.recTag,
				serial: vm.obj.serial,
				objType: vm.obj.objType.objTypeTag,
				idMin: vm.obj.idMin,
                idMax: vm.obj.idMax,
				data: vm.data.objId
            };
            if (('read' == vm.obj.cmd) && (true == vm.obj.checkSyncCnt)) {
                rqst = angular.extend(rqst, {cnt: vm.obj.syncCnt});
            }

			vm.loading = true;
			if (vm.isRecSelected() === true) {
				$sdkXmlSvc.postRec(rqst, onPostResult, onPostResult);
			} else {
				$sdkXmlSvc.postCmd(rqst, onPostResult, onPostResult);
			}
		}

		// $scope.$watch(function(){
		// 	return updateDataWatch();
		// }, function(newValue, oldValue){
		// 	updateData();
		// },
		// true);

		// Register events
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("SdkDemoCmdMainCtrl::showCmdRec", onShowMe);
		$scope.$on("SdkDemoCmdMainCtrl::objTypeSelected", onObjTypeSelected);

		// Expose public properties
		vm.obj          = null;
		vm.loading      = true;
		vm.show         = false;
		vm.searchText   = "";
		vm.recCmdTbl    = recCmdTbl;
		vm.data         = null;
		vm.serialList   = [];

		// Expose public methods
		vm.close            = close;
		vm.selectedState    = selectedState;
		vm.numItemGet       = numItemGet;
		vm.numRecGet        = numRecGet;
		vm.numCmdGet        = numCmdGet;
		vm.objTypeNameGet   = objTypeNameGet;
		vm.objTypeDescGet   = objTypeDescGet;
		vm.objTypeTagGet    = objTypeTagGet;
		vm.numObjIdGet      = numObjIdGet;
        vm.showObjIdMax     = showObjIdMax;
        vm.showSyncCnt      = showSyncCnt;
		vm.selectObjType    = selectObjType;
		vm.selectRecType    = selectRecType;
		vm.selectCmd        = selectCmd;
		vm.isRecSelected    = isRecSelected;
		vm.cmdNameGet       = cmdNameGet;
		vm.itemDescGet      = itemDescGet;
		vm.recTypeNameGet   = recTypeNameGet;
		vm.updateData       = updateData;
		vm.urlGet           = urlGet;
		vm.submit           = submit;

		// Start init
		initialize();
	}]);

})();