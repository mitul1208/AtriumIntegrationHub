(function(){

	var app = angular.module('atDirectives');

    app.directive("atCollapsible", function () {
        "use strict";

        return {
            restrict: "E",
            scope: {
                isExpanded: "=",
                onShow: "&",
                onHide: "&"
            },
            template: "<div class='panel panel-default' ng-transclude></div>",
            transclude: true,
            replace: true,
            link: function (scope, element, attrs) {
                $(element).on('show.bs.collapse', function (e) {
                    //Close all panel that are already open
                    element.parents(".panel-group").find(".panel-collapse.in").collapse('hide');
                    if ($.isFunction(scope.onShow)) scope.onShow();
                });

                $(element).on('hide.bs.collapse', function (e) {
                    if ($.isFunction(scope.onHide)) scope.onHide();
                });

                scope.$watch("isExpanded", function(value) {
                    if (!value) return;

                    $(element).collapse('show');
                    $(element).find("div.panel-collapse.collapse").addClass("in");
                });

            }
        }
    });

})();