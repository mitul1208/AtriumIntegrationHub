(function () {

    var app = angular.module('atDirectives');

    app.directive("atDateTime", function () {
        "use strict";
        
        return {
            restrict: "A",
            require: '?ngModel',
            link: function (scope, element, attrs, controller) {
                element.attr('placeholder', 'yyyy/mm/dd-hh:mm');
                element.attr('style', 'color: black');
                element.mask("9999/99/99-99:99", {
                    completed: function () {
                        var a = this.val().split(/[^0-9]/);
                        var date =new Date(a[0],a[1]-1,a[2],a[3],a[4],0);
                        controller.$setViewValue(date);
                        if (isNaN(date)){
                            element.attr('style', 'border-color: red');
                        }
                        else
                            element.attr('style', 'border-color: black');
                        scope.$apply();
                    }
                });
            }
        };
    });

}());