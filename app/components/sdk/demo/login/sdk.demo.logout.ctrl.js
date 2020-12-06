(function(){

	var app = angular.module('atControllers');

    app.controller("SdkLogoutCtrl", ["$location", "$sdkXmlSvc", "$sdkHistorySvc",
        function($location, $sdkXmlSvc, $sdkHistorySvc) {
        "use strict";

        var vm = this;

        var logout = function (){
            $sdkXmlSvc.getSetSessionKey(null);
            var data = {
                cmd: "logout"
            }
            $sdkXmlSvc.jsonPost("login_sdk.xml", data);
            $sdkHistorySvc.create("LOGIN_SDK", false, data);
        }
        var redirect = function(){
            $location.path("/");
        }

        vm.logout = logout;
        vm.redirect = redirect;

    }]);

})();