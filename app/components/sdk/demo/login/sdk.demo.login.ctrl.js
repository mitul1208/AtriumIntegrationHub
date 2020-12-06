(function () {

    var app = angular.module('atControllers');
    app.controller("SdkLoginCtrl", ["$location", "$rootScope", "$scope", "$sdkXmlSvc", "$sdkDeviceSvc", "$sdkHistorySvc",
        function ($location, $rootScope, $scope, $sdkXmlSvc, $sdkDeviceSvc, $sdkHistorySvc) {
        "use strict";
        

        var vm = this;
        var pubBaseUrlCanada = "http://24.37.57.234:91";
        var pubBaseUrlEurope = "http://80.14.69.105:8888";

        function initialize() {
            vm.url = $sdkXmlSvc.getSetBaseUrl();
        }

        function modelUpdate(object) {
            $sdkHistorySvc.create("LOGIN_SDK", true, object.LOGIN_SDK);
            vm.model = object.LOGIN_SDK;
            if (undefined != vm.model.CONNECTION._err) {
                vm.error = vm.model.CONNECTION._err;
            } else {
                vm.error = "err_timeout";
            }

            vm.locked = false;
            if (undefined != vm.model.CONNECTION._lock) {
                if (1 == vm.model.CONNECTION._lock) {
                    vm.locked = true;
                }
            }

            if (undefined != vm.model.DEVICE._mdl_label) {
                vm.mdlName = vm.model.DEVICE._mdl_label;
            } else {
                vm.mdlName = null;
            }

            if (undefined != vm.model.DEVICE._serial) {
                $sdkXmlSvc.getSetTargetSerial(vm.model.DEVICE._serial);
                $sdkDeviceSvc.setDeviceInfo(vm.model.DEVICE._serial, vm.model.DEVICE._serial, vm.mdlName, vm.url);
            }
        }

        function onConnectSuccess(object) {
            modelUpdate(object);
            vm.isProcessing = false;
            if ("ok" === vm.error) {
                login();
            }
        }

        function login() {
            vm.error = "ok";

            if (!vm.url || !vm.username || !vm.password) {
                vm.error = "err_incomplete"; //Field required
                return;
            }

            //Encrypt
            vm.key = md5(vm.model.DEVICE._serial + vm.model.CONNECTION._session);
            var data = {
                cmd: "login",
                login_user: rc4(vm.key, vm.username),
                login_pass: md5(vm.key + vm.password)
            }
            $sdkHistorySvc.create("LOGIN_SDK", false, data);

            vm.isProcessing = true;

            $sdkXmlSvc.jsonPost("login_sdk.xml", data, onLoginSuccess);
        }

        function onLoginSuccess(object) {
            vm.password = "";
            vm.isProcessing = false;
            modelUpdate(object);

            //If authentication is done
            if (vm.model.SDK_CFG._user_id != -1) {
                $sdkXmlSvc.getSetSessionKey(vm.key);
                $location.path("/sdk/demo/cmd");
            }
        }

        var connect = function () {
            var data = {
                cmd: "login_get"
            };
            $sdkHistorySvc.create("LOGIN_SDK", false, data);
            $sdkXmlSvc.jsonGet("login_sdk.xml", onConnectSuccess);
        }
        var setBaseUrl = function() {
            vm.username = "admin";
            vm.password = "admin";
            vm.url = $sdkXmlSvc.getSetBaseUrl();
            if (("" == vm.url) || ("/" == vm.url)) {
                vm.url = $sdkXmlSvc.getSetBaseUrl(pubBaseUrlCanada);
            }
        }
        var setMyBaseUrl = function() {
            vm.username = "admin";
            vm.password = "admin";
            if (angular.isDefined(vm.myBaseUrl)) {
                vm.url = $sdkXmlSvc.getSetBaseUrl(vm.myBaseUrl);
            }
        }

        $scope.$watch(function () {
            return vm.url;
        }, function (newValue, oldValue) {
            $sdkXmlSvc.getSetBaseUrl(vm.url);
        },
        true);

		$scope.$on("MenuController::isReady", function() {		//Update page title when menu is ready
            $rootScope.$broadcast("MenuController::setPageLabel", "menu_lbl_sdk_demo_login");
        });

        // Expose public properties
        vm.isProcessing = false;
        vm.error = "ok";
        vm.locked = false;
        vm.mdlName = null;
        vm.key = null;
        vm.username = "";
        vm.password = "";
        // vm.myBaseUrl = "http://192.168.1.202/";
        // vm.myBaseUrl = "http://192.168.2.227/";
        // vm.myBaseUrl = "http://192.168.2.216/";

        // Expose public methods
        vm.connect = connect;
        vm.setBaseUrl = setBaseUrl;
        vm.setMyBaseUrl = setMyBaseUrl;

        // Start init
        initialize();
    }]);

})();