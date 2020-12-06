(function () {

	var app = angular.module('atControllers');

	app.controller('SdkDemoEvtCmdCtrl', ['$rootScope', '$scope', '$sdkXmlSvc', '$sdkDeviceSvc', '$sdkEvtSvc',
		function ($rootScope, $scope, $sdkXmlSvc, $sdkDeviceSvc, $sdkEvtSvc) {
		"use strict";

		var vm = this;
		var evtCmd = [
			{
				label: "Read",
				cmd: "read"
			},
			{
				label: "Query with filter",
				cmd: "query"
			},
			{
				label: "Query and read with filter",
				cmd: "query_read"
			},
		];

		function initialize() {
			vm.rqst = {
				cmd: "query_read",
				serial: $sdkXmlSvc.getSetTargetSerial(),
				ojbTypeMin: "0",
				ojbTypeMax: "FFFFFFFF",
				idMin: 0,
				idMax: 25000,
				lastTsStr: "-1",
				lastSernum: "FFFFFFFF",
				lastNum: "FFFFFFFF"
			};
			vm.loading = false;

			$rootScope.$broadcast("SdkDemoEvtCmdCtrl::init");
			vm.serialList = $sdkDeviceSvc.getDeviceListByMaster($sdkXmlSvc.getSetTargetSerial());
			$sdkXmlSvc.sdkParserCallbackRegister($sdkDeviceSvc.onSdkItemParse);
		}
		function onSearchUpdate(e, searchText) {
			vm.searchText = searchText;
		}
		function onShowMe(e, show) {
			vm.show = show;
		}
		function onEvtSelected(e, evt){
			vm.rqst.lastTsStr = evt.timeUtc;
			vm.rqst.lastSernum = evt.serial;
			vm.rqst.lastNum = evt.id;
		}
		function retrieveUsedEvt () {
			var rqst = {
				cmd: 'info',
				recTag: 'cfg',
				serial: vm.rqst.serial,
				objType: 'evt_save'
			};

			vm.loading = true;
			$sdkXmlSvc.postRec(rqst, onRetieveUsedEvt, onRetrieveFail);
		}
		function onRetieveUsedEvt (data) {
			vm.loading = false;
			var idMax = $sdkDeviceSvc.getSetObjIdUsed(vm.rqst.serial, 'evt_save');
			if (idMax != 0){
				vm.rqst.idMax = parseInt(idMax);
			}
			vm.idLast = $sdkDeviceSvc.getSetObjIdMax(vm.rqst.serial, 'evt_save');
		}
		function onRetrieveFail (){
			vm.loading = false;
		}

		var close = function(){
			initialize();
		}
		var selectCmd = function (cmdObj) {
			if (vm.rqst.cmd != cmdObj.cmd){
				vm.rqst.cmd = cmdObj.cmd;
				if (vm.rqst.cmd == "read"){
					retrieveUsedEvt();
				}
				else {
					vm.rqst.idMin = 0;
					vm.rqst.idMax = 25000;
				}
			}
		}
		var evtCmdLabelGet = function(){
			for (var i=0; i<vm.evtCmd.length; i++){
				if (vm.rqst.cmd === vm.evtCmd[i].cmd){
					return vm.evtCmd[i].label;
				}
			}
			return null;
		}
		var resetEvtSelected = function(){
			vm.rqst.lastTsStr = "-1";
			vm.rqst.lastSernum = "FFFFFFFF";
            vm.rqst.lastNum = "FFFFFFFF";
		}
		var updateLastEvt = function(){
			var evt = $sdkEvtSvc.getLastEvt();
			vm.rqst.lastTsStr = evt.lastTsStr;
			vm.rqst.lastSernum = evt.lastSernum;
			vm.rqst.lastNum = evt.lastNum;
		}
		function onPostResult(data){
			// updateData();
			vm.loading = false;
		}
		var submit = function () {
			vm.loading = true;
			$sdkXmlSvc.postEvt(vm.rqst, onPostResult, onPostResult);
		}
		var urlGet = function () {
			var url = $sdkXmlSvc.getSetBaseUrl();
			url = url + "sdk.xml";
			return url;
		}
		var disableUpdateToLast = function () {
			var evtList = $sdkEvtSvc.all();
			if (evtList.length > 0){
				return false;
			}
			return true;
		}

		// Register events
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("SdkDemoEvtMainCtrl::showEvtCmd", onShowMe);
		$scope.$on("SdkDemoEvtMainCtrl::evtSelected", onEvtSelected);

		// Expose public properties
		vm.rqst = {};
		vm.loading = true;
		vm.show = false;
		vm.searchText = "";
		vm.evtCmd = evtCmd;
		vm.serialList = [];
		vm.idLast = "";

		// Expose public methods
		vm.close = close;
		vm.submit = submit;
		vm.selectCmd = selectCmd;
		vm.evtCmdLabelGet = evtCmdLabelGet;
		vm.resetEvtSelected = resetEvtSelected;
		vm.updateLastEvt = updateLastEvt;
		vm.urlGet = urlGet;
		vm.disableUpdateToLast = disableUpdateToLast;

		// Start init
		initialize();
	}]);

})();