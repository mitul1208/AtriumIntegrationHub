(function(){

    var app = angular.module('atrium');

    /**
     * @ngInject
     */
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.

        when('/', {
            templateUrl: './components/home/home.html',
            controller: "HomeCtrl",
            controllerAs: "vm"
        }).
        when('/sdk/doc/objtypes', {
            templateUrl: './components/sdk/doc/objtypes/objtypes.html',
            controller: "ObjTypesCtrl",
            controllerAs: "vm"
        }).
        when('/sdk/doc/objtype/:objTypeTag', {
            templateUrl: './components/sdk/doc/objtype/objtype.html',
            controller: "ObjTypeCtrl",
            controllerAs: "vm"
        }).
        when('/sdk/example', {
            templateUrl: './components/sdk/example/sdk-example-main.html',
            controller: "SdkExampleMainCtrl",
            controllerAs: "vm"
        }).
        when('/sdk/demo', {
            templateUrl: './components/sdk/demo/login/sdk-demo-login.html',
            controller: "SdkLoginCtrl",
            controllerAs: "vm"
        }).
        when("/sdk/demo/logout", {
            templateUrl: "./components/sdk/demo/login/sdk-demo-logout.html",
            controller: "SdkLogoutCtrl",
            controllerAs: "vm"
        }).
        when('/sdk/demo/cmd', {
            templateUrl: './components/sdk/demo/cmd/sdk-demo-cmd-main.html',
            controller: "SdkDemoCmdMainCtrl",
            controllerAs: "vm"
        }).
        when('/sdk/demo/evt', {
            templateUrl: './components/sdk/demo/evt/sdk-demo-evt-main.html',
            controller: "SdkDemoEvtMainCtrl",
            controllerAs: "vm"
        }).
        otherwise({
            redirectTo: "/"
        });
    }]);

})();