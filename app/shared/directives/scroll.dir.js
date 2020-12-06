(function() {
	// <ANY ng-scroll="onScroll($event)"></ANY>
	 
    var app = angular.module('atDirectives');

	app.directive('ngScroll', ['$parse', function($parse) {
		return function(scope, element, attr) {
			var fn = $parse(attr.ngScroll);

			element.bind('scroll', function(event) {
				scope.$apply(function() {
					fn(scope, {
						$event: event
					});
				});
			});
		};
	}]);
}.call(this));