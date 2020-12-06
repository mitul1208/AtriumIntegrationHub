(function(){

	var app = angular.module('atControllers');

	app.controller('ObjTypesCtrl', ['$sdkObjTypeSvc', '$rootScope', '$scope', '$timeout', '$filter', '$sdkXmlSvc',
		function($sdkObjTypeSvc, $rootScope, $scope, $timeout, $filter, $sdkXmlSvc){
		"use strict";

		var vm = this;

		function initialize(){
			vm.objTypes = $sdkObjTypeSvc.all();
			vm.loading = false;
            vm.objTypeDisp = $sdkXmlSvc.getSetObjTypeDisp();
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}

		var setObjTypeDisp = function (objTypeDisp) {
			vm.objTypeDisp = $sdkXmlSvc.getSetObjTypeDisp(objTypeDisp);
		}
        var getFilterList = function () {
			var filterList = [];
			if (null != vm.objTypes){
                filterList = $filter('filter')(vm.objTypes, vm.searchText);
                filterList = $filter('filter')(filterList, function (item){
                    if ((item.disp != 'adv') || (item.disp == vm.objTypeDisp)){
                        return true;
                    }
                    return false;
                });
                filterList = $filter('orderBy')(filterList, 'name');
			}
            // filterList = $filter('orderBy')(filterList, ['sn', 'id', 'desc']);
            return filterList;
        }

		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("MenuController::isReady", function() {		//Update page title when menu is ready
            $rootScope.$broadcast("MenuController::setPageLabel", "menu_lbl_sdk_doc");
        });

		// Expose public properties
		vm.showDone = false;
		vm.objTypes = [];
		vm.loading = true;
		vm.searchText = "";
        vm.objTypeDisp = 'basic';

		// Expose public methods
        vm.setObjTypeDisp = setObjTypeDisp;
        vm.getFilterList = getFilterList;

		// Start init
		initialize();

	}]);

})();