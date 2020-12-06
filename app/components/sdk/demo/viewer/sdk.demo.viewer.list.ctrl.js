(function(){

	var app = angular.module('atControllers');

	app.controller('SdkDemoViewerListCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$sdkObjTypeSvc', '$sdkHistorySvc', '$sdkXmlSvc',
		function($rootScope, $scope, $timeout, $window, $sdkObjTypeSvc, $sdkHistorySvc, $sdkXmlSvc){
		"use strict";

		var vm = this;
		var showRight = false;

		function initialize(){
			vm.loading = false;
			$sdkXmlSvc.sdkParserCallbackRegister($sdkHistorySvc.create);
			$rootScope.$broadcast("SdkDemoViewerListCtrl::init");
		}
		function onShowMe(e, show){
			vm.showRight = show;
			// if (vm.objList.length == 0){
			// 	show = false;
			// }
			vm.show = show;
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}

		var selectObj = function(obj){
            vm.selectedObj = obj;
			$rootScope.$broadcast("SdkDemoViewerListCtrl::objViewSelected", obj);
		}
		var clearList = function(){
			$sdkHistorySvc.empty();
		}

		$scope.$watch(function(){
			return $sdkHistorySvc.all();
		}, function(newValue, oldValue){
			vm.objList = $sdkHistorySvc.all();
			if (vm.objList.length > 0){
				if (vm.showRight === true){
					vm.show = true;
				}
			}
			else{
				vm.show = false;
			}
		},
		true);

		// Register events
		$scope.$on("SdkDemoCmdMainCtrl::showTrxList", onShowMe);
		$scope.$on("SdkDemoEvtMainCtrl::showTrxList", onShowMe);
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);

		// Expose public properties
		vm.objList = [];
		vm.loading = true;
		vm.show = false;
		vm.showRight = false;
		vm.searchText = "";
        vm.selectedObj = null;

		// Expose public methods
		vm.selectObj = selectObj;
		vm.clearList = clearList;

		// Init
		initialize();
	}]);

})();