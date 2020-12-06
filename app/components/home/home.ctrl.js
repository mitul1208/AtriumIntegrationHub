(function(){

	var app = angular.module('atControllers');

	app.controller('HomeCtrl', function(){
		"use strict";

		var vm = this;

		function initialize(){
			// console.debug('home init');
			vm.loading = false;
		}

		vm.loading = true;

		// Expose public methods

		// Start init
		initialize();

	});

})();