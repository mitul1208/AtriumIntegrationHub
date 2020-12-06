(function(){

	var app = angular.module('atDirectives');

    app.directive("atLabelPlaceholder", ["$rootScope", "$atLabel",
        function ($rootScope, $atLabel) {
        "use strict";

        return {
            restrict: "A",
            link: function (scope, element, attrs) {

                var process = function () {
                    if (attrs.atLabelPlaceholder && $rootScope.hasLabels) {
                        element.attr("placeholder", $atLabel.get(attrs.atLabelPlaceholder));
                    }
                }

                //Display now and refresh when language change
                process();
                scope.$on("$atLocalisation::updated", function () { process(); });
            }
        }
    }]);

})();