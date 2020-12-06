(function(){

	var app = angular.module('atControllers');

	app.controller('SdkDemoCmdMainCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$sdkObjTypeSvc', '$sdkXmlSvc',
		function($rootScope, $scope, $timeout, $window, $sdkObjTypeSvc, $sdkXmlSvc){
		"use strict";

		var vm = this;

		function initialize(){
			vm.loading = false;
			$scope.$broadcast("SdkDemoCmdMainCtrl::showCmdRec");
			// console.debug('demo init');
		}
		function onSelectObjType(e){
			$scope.$broadcast("SdkDemoCmdMainCtrl::selectObjType");
			$scope.$broadcast("SdkDemoCmdMainCtrl::objViewSelected");
			$scope.$broadcast("SdkDemoCmdMainCtrl::showTrxList", false);
		}
		function onObjTypeSelected(e, objType){
			$scope.$broadcast("SdkDemoCmdMainCtrl::objTypeSelected", objType);
			$scope.$broadcast("SdkDemoCmdMainCtrl::showTrxList", true);
            $scope.$broadcast("SdkDemoCmdMainCtrl::objViewSelected", null);
		}
		function onObjTypeItemSelected(e, objTypeItem, objTypeTag, serial, objId){
			$scope.$broadcast("SdkDemoCmdMainCtrl::objTypeItemSelected", objTypeItem, objTypeTag, serial, objId);
			$window.scrollTo(0, 0);
		}
		function onObjViewSelected(e, obj){
			$scope.$broadcast("SdkDemoCmdMainCtrl::objViewSelected", obj);
		}

		$scope.$watch(function(){
			return vm.searchText;
		}, function(newValue, oldValue){
			$scope.$broadcast("SdkDemoCmdMainCtrl::searchUpdate", vm.searchText);
		},
		true);

		// Register events
		$scope.$on("SdkDemoCmdRecCtrl::init", initialize);
		$scope.$on("SdkDemoCmdRecCtrl::selectObjType", onSelectObjType);
		$scope.$on("SdkDemoCmdRecCtrl::objTypeItemSelected", onObjTypeItemSelected);
		$scope.$on("SdkDemoCmdRecDetailCtrl::init", initialize);
		$scope.$on("DemoObjTypesCtrl::objTypeSelected", onObjTypeSelected);
		$scope.$on("SdkDemoViewerListCtrl::objViewSelected", onObjViewSelected);

		//Update page title when menu is ready
        $scope.$on("MenuController::isReady", function() {
            $rootScope.$broadcast("MenuController::setPageLabel", "menu_lbl_sdk_demo_cmd");
        });

		// Expose public properties
		vm.loading = true;

		// Expose public methods

	}]);

})();