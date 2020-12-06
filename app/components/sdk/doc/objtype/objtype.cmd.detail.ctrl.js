(function(){

	var app = angular.module('atControllers');

	app.controller('ObjTypeCmdCtrl', ['$routeParams', '$location', '$rootScope', '$scope', '$sdkObjTypeSvc',
		function($routeParams, $location, $rootScope, $scope, $sdkObjTypeSvc){
		"use strict";

		var vm = this;

		function initialize(){
			// console.debug('ObjTypeCmdCtrl init');
		}

		var set = function(objTypeCmd){
			vm.objTypeCmd = objTypeCmd;
			if (null != objTypeCmd){
				vm.showMe = true;
			}
			else{
				vm.showMe = false;
			}
			console.debug('ObjTypeCmdCtrl set', objTypeCmd);
		}
		var get = function(){
			return vm.objTypeCmd;
		}
		var close = function(){
			vm.showMe = false;
			$rootScope.$broadcast("ObjTypeCmdCtrl::showPanel", 'none');
		}

		var numItemGet = function(){
			if (null != vm.objTypeCmd){
				if (null != vm.objTypeCmd.tblTags){
					return vm.objTypeCmd.tblTags.length;
				}
			}
			return 0;
		}

		// vm.save = function(form){
		// 	if(form.$invalid) return;
		// 	$sdkObjTypeSvc.update(vm.objType)
		// 		.then(function(){
		// 				$location.path('/');
		// 			},
		// 			function(){
		// 				alert("Les données n'ont pas été sauvegardées.");
		// 			});
		// }

		function onSelectCmd(e, cmd){
			vm.set(cmd);
			vm.showMe = true;
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}
		function onShowNone(e){
			vm.showMe = false;
		}

		// Register events
    	$scope.$on("ObjTypeCtrl::selectCmd", onSelectCmd);
		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);
		$scope.$on("ObjTypeCtrl::showNone", onShowNone);

		// Expose public properties
		vm.objTypeCmd = [];
		vm.loading = true;
		vm.showMe = false;
		vm.searchText = "";

		// Expose public methods
		vm.set = set;
		vm.get = get;
		vm.close = close;
		vm.numItemGet = numItemGet;

		// Start init
		initialize();
	}]);

})();