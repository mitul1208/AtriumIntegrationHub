(function(){

	var app = angular.module('atDirectives');

    app.directive("atTooltip", function () {
        "use strict";

        return {
            restrict: "A",
            link: function (scope, element, attrs) {

                //When title changed, update title value
                attrs.$observe("atTooltip", function (value) {
                    if (!value) return;

                    element.attr('data-original-title', value);
                    element.tooltip({ trigger: "click", placement: "bottom" });
                });
            }
        }
    });

})();