(function(){

	var app = angular.module('atDirectives');

    app.directive("atProcessingContainer", function () {
        "use strict";

        return {
            restrict: "E",
            scope: {
                isProcessing: "="
            },
            transclude: true,
            template: "<div ng-class=\"{'is-processing': isProcessing}\" style='position:relative'>" +
                            "<div ng-transclude></div>" +
                            "<div ng-show='isProcessing' class='loading-container'></div>" +
                        "</div>"
        }
    });

})();