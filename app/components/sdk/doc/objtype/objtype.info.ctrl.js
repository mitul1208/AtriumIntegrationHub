(function(){

	var app = angular.module('atControllers');

	app.controller('ObjTypeInfoCtrl', ['$rootScope', '$routeParams', '$location', '$scope', '$sdkObjTypeSvc',
		function($rootScope, $routeParams, $location, $scope, $sdkObjTypeSvc){
		"use strict";

		var vm = this;

		function initialize(){
			// console.debug('ObjTypeInfoCtrl init');
			$rootScope.$broadcast("ObjTypeInfoCtrl::init");
		}

		function onObjTypeSelect(e, objType){
			vm.objType = objType;
			// console.debug('objTypeInfoCtrl init');
			vm.loading = false;
			vm.showInfo = true;
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}
		function onShowStateRec(e, state){
			if (vm.numRecGet() != 0){
				vm.showRec = state;
			}
			else{
				vm.showRec = false;
			}
		}
		function onShowStateCmd(e, state){
			if (vm.numCmdGet() != 0){
				vm.showCmd = state;
			}
			else{
				vm.showCmd = false;
			}
		}
		function onShowStateEvt(e, state){
			if (vm.numEvtGet() != 0){
				vm.showEvt = state;
			}
			else{
				vm.showEvt = false;
			}
		}
		function onShowStateInfo(e, state){
			vm.showInfo = state;
		}
		function onShowNone(e){
			onShowStateRec(false);
			onShowStateCmd(false);
			onShowStateEvt(false);
			onShowStateInfo(false);
		}
		function showPanel(state, msg){
			vm.searchText = "";
			if (true===state){
				$rootScope.$broadcast("objTypeInfoCtrl::showPanel", msg);
			}
			else{
				$rootScope.$broadcast("objTypeInfoCtrl::showPanel", 'none');
			}
		}

		var numRecGet = function()	{	return $sdkObjTypeSvc.numRecGet(vm.objType);	}
		var numCmdGet = function()	{	return $sdkObjTypeSvc.numCmdGet(vm.objType);	}
		var numEvtGet = function()	{	return $sdkObjTypeSvc.numEvtGet(vm.objType);	}
		var setShowStateRec = function(state) { showPanel(state, 'recList'); }
		var setShowStateCmd = function(state) { showPanel(state, 'cmdList'); }
		var setShowStateEvt = function(state) { showPanel(state, 'evtList'); }
		var selectRec = function(rec){
			$rootScope.$broadcast("objTypeInfoCtrl::selectRec", rec);
		}
		var selectCmd = function(cmd){
			$rootScope.$broadcast("objTypeInfoCtrl::selectCmd", cmd);
		}


		// Register events
    	$scope.$on("ObjTypeCtrl::objTypeSelect", onObjTypeSelect);
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("ObjTypeCtrl::showRecList", onShowStateRec);
		$scope.$on("ObjTypeCtrl::showCmdList", onShowStateCmd);
		$scope.$on("ObjTypeCtrl::showEvtList", onShowStateEvt);
		$scope.$on("ObjTypeCtrl::showInfo", onShowStateInfo);
		$scope.$on("ObjTypeCtrl::showNone", onShowNone);

		// Expose public properties
		vm.objType = [];
		vm.loading = true;
		vm.searchText = "";
		vm.showInfo = false;
		vm.showRec = false;
		vm.showCmd = false;
		vm.showEvt = false;

		// Expose public methods
		vm.numCmdGet = numCmdGet;
		vm.numRecGet = numRecGet;
		vm.numEvtGet = numEvtGet;
		vm.setShowStateRec = setShowStateRec;
		vm.setShowStateCmd = setShowStateCmd;
		vm.setShowStateEvt = setShowStateEvt;
		vm.selectRec = selectRec;
		vm.selectCmd = selectCmd;

		// Start init
		initialize();
	}]);

})();