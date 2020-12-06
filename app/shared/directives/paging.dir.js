(function(){

	var app = angular.module('atDirectives');

    app.directive("atPaging", function () {
        "use strict";

        return {
            restrict: "E",
            scope: {
                isProcessing: "=",
                pagedInfo: "=",
                onPaging: "&",
                firstLastUse: "="
            },
            template: "<div style='text-align:center' ng-show='isReady'>" +
                            "<div class='control'></div>" +
                    "</div>",
            link: function fieldLink(scope, element, attrs) {
                scope.isReady = false;

                //Initialize control
                var control = $(element).find(".control");
                control.bootpag({
                    total: 1,
                    page: 1,
                    maxVisible: 3,
                    firstLastUse: scope.firstLastUse,
                    leaps: true          //Jump pages when pressing "next"
                }).on("page", function (event, page) {
                    scope.$apply(function () {
                        scope.onPaging({ page: page });
                        window.scrollTo(0, 0);  //Scroll to top
                    });
                });

                //When value pagedInfo changed
                scope.$watch("pagedInfo", function (value) {
                    if (value == undefined) return;

                    //This control became ready when we receive a valid pagedInfo
                    if (!scope.isReady) scope.isReady = true;

                    control.bootpag({ page: value.page, total: value.totalPage });
                });

                scope.$watch("isProcessing", function(value) {
                    if (value == undefined) {
                        return;
                    }
                    if (value) {
                        $(element).find(".control ul > li").addClass("disabled");
                    }
                    else {
                        $(element).find(".control ul > li").removeClass("disabled");
                    }
                });
            }
        };
    });

})();