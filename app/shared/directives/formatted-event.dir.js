(function(){

    angular.module("atDirectives").directive("atFormattedEvent", ["$sce", "$rootScope", function ($sce, $rootScope) {
        "use strict";

        return {
            restrict: "E",
            scope: {
                item: "="
            },
            template: "<span ng-bind-html='details'></span>",
            replace: true,
            link: function (scope, element, attrs) {

                var process = function () {
                    if (scope.item !== undefined && $rootScope.hasLabels) {
                        scope.details = $sce.trustAsHtml(localization_events_get_desc(scope.item));
                    }
                }

                //Display now and refresh when language change
                process();
                scope.$on("$atLocalisation::updated", function () { process(); });
            }
        }
    }]);

})();