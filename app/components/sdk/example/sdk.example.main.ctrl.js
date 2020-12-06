(function () {

	var app = angular.module('atControllers');

	app.controller('SdkExampleMainCtrl', ['$rootScope', '$scope',
		function ($rootScope, $scope) {
		"use strict";

		var vm = this;

		$scope.$on("MenuController::isReady", function() {		//Update page title when menu is ready
            $rootScope.$broadcast("MenuController::setPageLabel", "menu_lbl_sdk_example");
        });

		// Expose public properties

		// Expose public methods
	}]);

})();