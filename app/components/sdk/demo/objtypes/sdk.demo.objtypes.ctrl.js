(function(){

	var app = angular.module('atControllers');

	app.controller('DemoObjTypesCtrl', ['$routeParams', '$location', '$rootScope', '$scope', '$filter', '$sdkXmlSvc', '$sdkObjTypeSvc',
		function($routeParams, $location, $rootScope, $scope, $filter, $sdkXmlSvc, $sdkObjTypeSvc){
		"use strict";

		var vm = this;

		function initialize(){
			// console.debug('DemoObjTypesCtrl init');
			vm.objTypes = $sdkObjTypeSvc.all();
			vm.loading = false;
            vm.objTypeDisp = $sdkXmlSvc.getSetObjTypeDisp();
		}
		function onSelectObjType(e){
			vm.show = true;
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}

		var select = function(objType){
			$rootScope.$broadcast("DemoObjTypesCtrl::objTypeSelected", objType);
			vm.show = false;
		}
		var close = function(){
			vm.select(null);
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

		$scope.$on("SdkDemoCmdMainCtrl::selectObjType", onSelectObjType);
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);

		// Expose public properties
		vm.objTypes = [];
		vm.loading = true;
		vm.show = false;
        vm.objTypeDisp = 'basic';

		// Expose public methods
		vm.select = select;
		vm.close = close;
        vm.setObjTypeDisp = setObjTypeDisp;
        vm.getFilterList = getFilterList;

		// Start init
		initialize();

	}]);


})();