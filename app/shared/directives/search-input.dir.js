(function(){

    angular.module("atDirectives").directive("atSearchInput", function() {
        "use strict";

        return {
            restrict: "E",
            scope: {
                placeholderLabel: "@",
                query: "="
            },
            templateUrl: "templates/search-input.html",
            link: function(scope, element, attrs) {
                scope.onBlurOnly = attrs.onBlurOnly !== undefined;            
            }
        }
    });

})();