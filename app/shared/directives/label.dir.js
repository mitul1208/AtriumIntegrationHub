(function(){

	var app = angular.module('atDirectives');

    app.directive("atLabel", ["$rootScope", "$atLabel",
        function ($rootScope, $atLabel) {
        "use strict";

        return {
            restrict: "A",
            link: function (scope, element, attrs) {

                var process = function () {
                    if (attrs.atLabel && $rootScope.hasLabels) {
                        element.text($atLabel.get(attrs.atLabel));
                    }
                }

                //Watch changed only if requested
                if (attrs.observe !== undefined) {
                    attrs.$observe("atLabel", function () { process(); });
                }

                //Display now and refresh when language change
                process();
                scope.$on("$atLocalisation::updated", function () { process(); });
            }
        }
    }]);

})();