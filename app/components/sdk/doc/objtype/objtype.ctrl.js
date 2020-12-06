(function(){

	var app = angular.module('atControllers');

	app.controller('ObjTypeCtrl', ['$rootScope', '$routeParams', '$location', '$scope', '$sdkObjTypeSvc',
		function($rootScope, $routeParams, $location, $scope, $sdkObjTypeSvc){
		"use strict";

		var vm = this;

		function initialize(){
			vm.objTypeTag = $routeParams.objTypeTag;
			if (null != vm.objTypeTag){
				vm.objType = $sdkObjTypeSvc.getByObjTypeTag(vm.objTypeTag);
				if (null != vm.objType){
					$scope.$broadcast("ObjTypeCtrl::objTypeSelect", vm.objType);
					// console.debug('objType: ', vm.objType);
					vm.loading = false;
				}
			}
		}

		$scope.$watch(function(){
			return vm.searchText;
		}, function(newValue, oldValue){
			// console.debug('searchUpdate: ', vm.searchText);
			$scope.$broadcast("ObjTypeCtrl::searchUpdate", vm.searchText);
		},
		true);

		function contextClr(){
			vm.searchText = "";
			$scope.$broadcast("ObjTypeCtrl::searchUpdate", vm.searchText);
			$scope.$broadcast("ObjTypeCtrl::showNone");
		}
		function onRecSelect(e, rec){
			contextClr();
			$scope.$broadcast("ObjTypeCtrl::selectRec", rec);
		}
		function onCmdSelect(e, cmd){
			contextClr();
			$scope.$broadcast("ObjTypeCtrl::selectCmd", cmd);
		}
		function onShowPanel(e, whichPanel){
			contextClr();

			if ('recList'===whichPanel){
				$scope.$broadcast("ObjTypeCtrl::showRecList", true);
			}
			else if ('cmdList'===whichPanel){
				$scope.$broadcast("ObjTypeCtrl::showCmdList", true);
			}
			else if ('evtList'===whichPanel){
				$scope.$broadcast("ObjTypeCtrl::showEvtList", true);
			}
			else if ('none'===whichPanel){
				$scope.$broadcast("ObjTypeCtrl::showInfo", true);
			}
		}

		// Register events
    	$scope.$on("objTypeInfoCtrl::selectRec", onRecSelect);
		$scope.$on("objTypeInfoCtrl::selectCmd", onCmdSelect);
		$scope.$on("objTypeInfoCtrl::showPanel", onShowPanel);
		$scope.$on("ObjTypeCmdCtrl::showPanel", onShowPanel);
		$scope.$on("ObjTypeRecCtrl::showPanel", onShowPanel);
		$scope.$on("ObjTypeInfoCtrl::init", initialize);
		$scope.$on("MenuController::isReady", function() {		//Update page title when menu is ready
            $rootScope.$broadcast("MenuController::setPageLabel", "menu_lbl_sdk_doc");
        });

		// Expose public properties
		vm.loading = true;

		// Expose public methods

	}]);

})();