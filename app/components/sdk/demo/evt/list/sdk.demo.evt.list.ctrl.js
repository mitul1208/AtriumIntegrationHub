(function(){

	var app = angular.module('atControllers');

	app.controller('SdkDemoEvtListCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$sdkObjTypeSvc', '$sdkEvtSvc', '$sdkXmlSvc',
		function($rootScope, $scope, $timeout, $window, $sdkObjTypeSvc, $sdkEvtSvc, $sdkXmlSvc){
		"use strict";

		var vm = this;
		var showRight = false;

		function initialize(){
			vm.loading = false;
			$sdkXmlSvc.sdkParserCallbackRegister($sdkEvtSvc.onSdkItemParse);
			$rootScope.$broadcast("SdkDemoEvtListCtrl::init");
		}
		function onShowMe(e, show){
			vm.showRight = show;
			if (vm.evtList.length == 0){
				show = false;
			}
			vm.show = show;
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}

		var close = function(){
			vm.show = false;
		}
		var selectObj = function(obj){
			$rootScope.$broadcast("SdkDemoEvtListCtrl::evtSelected", obj);
		}
		var clearList = function(){
			$sdkEvtSvc.empty();
		}

		$scope.$watch(function(){
			return $sdkEvtSvc.all();
		}, function(newValue, oldValue){
			vm.evtList = $sdkEvtSvc.all();
			if (vm.evtList.length > 0){
				if (vm.showRight === true){
					vm.show = true;
				}
			}
		},
		true);

		// Register events
        $scope.$on("SdkDemoEvtMainCtrl::showEvtList", onShowMe);
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);

		// Expose public properties
		vm.evtList = [];
		vm.loading = true;
		vm.show = false;
		vm.searchText = "";
		vm.clearList = clearList;
		vm.selectObj = selectObj;
		vm.close = close;

		// Expose public methods

		// Init
		initialize();
	}]);

})();