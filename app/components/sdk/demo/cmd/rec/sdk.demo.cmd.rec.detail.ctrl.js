(function () {

	var app = angular.module('atControllers');

	app.controller('SdkDemoCmdRecDetailCtrl', ['$rootScope', '$scope', '$filter', '$sdkXmlSvc', '$sdkObjTypeSvc', '$sdkDeviceSvc', '$sdkTagDataSvc',
		function ($rootScope, $scope, $filter, $sdkXmlSvc, $sdkObjTypeSvc, $sdkDeviceSvc, $sdkTagDataSvc) {
		"use strict";

		var vm = this;
		var device = {
			serial: 0,
			objTypeTag: null,
			objId: 0
		}

		function initialize() {
			$rootScope.$broadcast("SdkDemoCmdRecDetailCtrl::init");
			vm.loading = false;
			vm.objStatusTbl = $sdkTagDataSvc.objStatusTblGet();
			vm.tagDisp = $sdkXmlSvc.getSetTagDisp();
		}
		function onSearchUpdate(e, searchText) {
			vm.searchText = searchText;
		}
		function onShowMe(e) {
			vm.show = false;
			if (null != vm.data){
				if (null != vm.data.objId){
					if (vm.data.objId.length > 0){
						vm.show = true;
					}
				}
			}
		}
		function onObjIdRx(e, data) {
			vm.data = data;
			onShowMe();
		}
		function checkWatch(){
			var res = "none";
			var all = true;
			if (null != vm.data){
				if (null != vm.data.objId){
					for (var i=0; i<vm.data.objId.length; i++){
						if (true == vm.data.objId[i].check){
							if (true == all){
								res = "all";
							}
							else{
								return "partial";
							}
						}
						else{
							if (res == "all"){
								return "partial";
							}
							all = false;
						}
					}
				}
			}
			return res;
		}

		var close = function(){
			vm.show = false;
			$rootScope.$broadcast("SdkDemoCmdRecDetailCtrl::close");
		}
		var checkTag = function (tag){
			if (vm.data.checkEnable == true){
				tag.check = true;
			}
		}
		var updateCheck = function (state){
			vm.checkAll = state;
			var filteredList = getFilterList();
			for (var i=0; i<filteredList.length; i++){
				filteredList[i].check = state;
			}
		}
		var disableGet = function (tag){
			if (true == vm.data.editEnable){
				if (undefined != tag){
					var objFormat = $sdkTagDataSvc.objFormatGet(tag.tagName);
					return objFormat.disabled;
				}
			}
			return true;
		}
		var setTagDisp = function (tagDisp) {
			vm.tagDisp = $sdkXmlSvc.getSetTagDisp(tagDisp);
		}
        var getFilterList = function () {
			var filterList = [];
			if (null != vm.data){
				if (null != vm.data.objId){
					filterList = $filter('filter')(vm.data.objId, vm.searchText);
					filterList = $filter('filter')(filterList, function (item){
						if ((item.disp != 'adv') || (item.disp == vm.tagDisp)){
							return true;
						}
						return false;
					});
				}
			}
            // filterList = $filter('orderBy')(filterList, ['sn', 'id', 'desc']);
            return filterList;
        }

		$scope.$watch(function(){
			return checkWatch();
		}, function(newValue, oldValue){
			if (newValue == "none"){
				updateCheck(false);
			}
			else if (newValue == "all"){
				updateCheck(true);
			}
			else if (newValue == "partial"){
				vm.checkAll = false;
			}
		},
		true);

		// Register events
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("SdkDemoCmdMainCtrl::objTypeItemSelected", onObjIdRx);

		// Expose public properties
		vm.loading = true;
		vm.show = false;
		vm.searchText = "";
		vm.data = null;
		vm.checkAll = false;
		vm.objStatusTbl = [];
		vm.tagDisp = 'basic';

		// Expose public methods
		vm.close = close;
		vm.updateCheck = updateCheck;
		vm.checkTag = checkTag;
		vm.disableGet = disableGet;
		vm.getFilterList = getFilterList;
		vm.setTagDisp = setTagDisp;

		// Start init
		initialize();
	}]);

})();