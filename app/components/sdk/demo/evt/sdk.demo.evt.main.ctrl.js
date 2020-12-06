(function(){

	var app = angular.module('atControllers');

	app.controller('SdkDemoEvtMainCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$sdkObjTypeSvc', '$sdkXmlSvc',
		function($rootScope, $scope, $timeout, $window, $sdkObjTypeSvc, $sdkXmlSvc){
		"use strict";

		var vm = this;

		function initialize(){
			vm.loading = false;
			$scope.$broadcast("SdkDemoEvtMainCtrl::showEvtCmd", true);
			$scope.$broadcast("SdkDemoEvtMainCtrl::showEvtList", true);
			$scope.$broadcast("SdkDemoEvtMainCtrl::showTrxList", true);
		}
		function onObjViewSelected(e, obj){
			$scope.$broadcast("SdkDemoEvtMainCtrl::objViewSelected", obj);
		}
		function onEvtSelected(e, evt){
			$scope.$broadcast("SdkDemoEvtMainCtrl::evtSelected", evt);
		}

		$scope.$watch(function(){
			return vm.searchText;
		}, function(newValue, oldValue){
			$scope.$broadcast("SdkDemoEvtMainCtrl::searchUpdate", vm.searchText);
		},
		true);

		// Register events
		$scope.$on("SdkDemoEvtCmdCtrl::init", initialize);
		$scope.$on("SdkDemoEvtListCtrl::init", initialize);
		$scope.$on("SdkDemoViewerListCtrl::init", initialize);
		$scope.$on("SdkDemoViewerListCtrl::objViewSelected", onObjViewSelected);
		$scope.$on("SdkDemoEvtListCtrl::evtSelected", onEvtSelected);

		$scope.$on("MenuController::isReady", function() {		//Update page title when menu is ready
            $rootScope.$broadcast("MenuController::setPageLabel", "menu_lbl_sdk_demo_evt");
        });

		// Expose public properties
		vm.loading = true;

		// Expose public methods

	}]);

})();