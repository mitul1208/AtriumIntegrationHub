(function(){

	var app = angular.module('atDirectives');

    app.directive("passwordToggle", function ($compile) {
        "use strict";

        return {
                restrict: 'A',
                scope:{},
                link: function(scope,elem,attrs){
                    scope.tgl = function(){ elem.attr('type',(elem.attr('type')==='text'?'password':'text')); }
                    var lnk = angular.element('<a data-ng-click="tgl()">Toggle</a>');
                    $compile(lnk)(scope);
                    elem.wrap('<div class="password-toggle"/>').after(lnk);
                }
            };
    });

})();