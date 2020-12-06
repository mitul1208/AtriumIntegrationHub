(function(){

	var app = angular.module('atControllers');

	app.controller('ObjTypeRecCtrl', ['$routeParams', '$location', '$rootScope', '$scope', '$filter', '$sdkXmlSvc', '$sdkObjTypeSvc',
		function($routeParams, $location, $rootScope, $scope, $filter, $sdkXmlSvc, $sdkObjTypeSvc){
		"use strict";

		var vm = this;

		function initialize(){
			// console.debug('ObjTypeRecCtrl init');
            vm.tagDisp = $sdkXmlSvc.getSetTagDisp();
		}

		var set = function(objTypeRec){
			vm.objTypeRec = objTypeRec;
			if (null != objTypeRec){
				vm.showMe = true;
			}
			else{
				vm.showMe = false;
			}
			console.debug('ObjTypeRecCtrl set', objTypeRec);
		}
		var get = function(){
			return vm.objTypeRec;
		}
		var close = function(){
			vm.showMe = false;
			$rootScope.$broadcast("ObjTypeRecCtrl::showPanel", 'none');
		}

		var numItemGet = function(){
			return vm.getFilterList().length;
		}

		function onSelectRec(e, rec){
			vm.set(rec);
			vm.showMe = true;
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}
		function onShowNone(e){
			vm.showMe = false;
		}

		var setTagDisp = function (tagDisp) {
			vm.tagDisp = $sdkXmlSvc.getSetTagDisp(tagDisp);
		}
        var getFilterList = function () {
			var filterList = [];
			if (null != vm.objTypeRec){
				if (null != vm.objTypeRec.tblTags){
					filterList = $filter('filter')(vm.objTypeRec.tblTags, vm.searchText);
					filterList = $filter('filter')(filterList, function (item){
						if ((item.disp != 'adv') || (item.disp == vm.tagDisp)){
							return true;
						}
						return false;
					});
				}
			}
            // filterList = $filter('orderBy')(filterList, ['label']);
            return filterList;
        }

		// Register events
    	$scope.$on("ObjTypeCtrl::selectRec", onSelectRec);
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("ObjTypeCtrl::showNone", onShowNone);

		// Expose public properties
		vm.objTypeRec = [];
		vm.loading = true;
		vm.showMe = false;
		vm.searchText = "";
        vm.tagDisp = 'basic';

		// Expose public methods
		vm.set = set;
		vm.get = get;
		vm.close = close;
		vm.numItemGet = numItemGet;
		vm.getFilterList = getFilterList;
		vm.setTagDisp = setTagDisp;

		// Start init
		initialize();
	}]);

})();
