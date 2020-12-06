(function() {

    var app = angular.module('atDirectives');

    app.directive("atScrollToItem", function () {
        "use strict";

        var link = function(scope, $elm,attr) {                                                   
            $elm.on('click', function() {                                                    
                $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
            });                                                                              
        };
        var ddo = {
            restrict: "A",
            scope: {
                scrollTo: "@"
            },
            link: link            
        };
        return ddo;
    });

}());


