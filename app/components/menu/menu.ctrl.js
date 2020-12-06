(function(){

	var app = angular.module('atControllers');

    app.controller("MenuController", ["$location", "$rootScope", "$scope", "$sdkXmlSvc",
        function ($location, $rootScope, $scope, $sdkXmlSvc) {
        "use strict";

        var vm = this;
        // var subMenuUser = {
        //     label: "menu_lbl_users",
        //     isActive: false,
        //     menus: [{
        //             label: "menu_lbl_users",
        //             href: "/users",
        //             isActive: false
        //         },
        //         {
        //             label: "menu_lbl_users_in",
        //             href: "users/musterReport",
        //             isActive: false
        //         }
        //     ]
        // };
        // var subMenuDoors = {
        //     label: "menu_lbl_doors",
        //     href: "/doors",
        //     isActive: false
        // };
        // var subMenuArea = {
        //     label: "menu_lbl_areas",
        //     href: "/areas",
        //     isActive: false
        // };
        // var subMenuConfig = {
        //     label: "menu_lbl_config",
        //     isActive: false,
        //     menus: [{
        //             label: "menu_lbl_holidays",
        //             href: "/configurations/holidays",
        //             isActive: false
        //         },
        //         {
        //             label: "menu_lbl_schedules",
        //             href: "/configurations/schedules",
        //             isActive: false
        //         },
        //         {
        //             label: "menu_lbl_access_levels",
        //             href: "/configurations/accessLevels",
        //             isActive: false
        //         },
        //         {
        //             label: "menu_lbl_access_template",
        //             href: "/configurations/accessLevelGroups",
        //             isActive: false
        //         },
        //         {
        //             label: "menu_lbl_floor_levels",
        //             href: "/configurations/floorLevels",
        //             isActive: false
        //         }
        //     ]
        // };
        // var subMenuCamera = {
        //     label: "menu_lbl_cameras",
        //     href: "/cameras",
        //     isActive: false
        // };
        // var subMenuEvents = {
        //     label: "menu_lbl_events",
        //     href: "/events",
        //     isActive: false
        // };
        // var subMenuHardwareCtrl = {
        //     label: "menu_lbl_info",
        //     href:"/hardwares/controlPanel/" + $atSession.getSessionSerial(), ///{{area._id}}
        //     isActive: false
        // };
        // var subMenuHardwareCtrlSub = {
        //     label: "menu_lbl_system",
        //     isActive: false,
        //     menus: [subMenuHardwareCtrl,
        //         {
        //             label: "menu_lbl_devices",
        //             href: "/hardwares/subControllers",
        //             isActive: false
        //         }
        //     ]
        // };
        // var subMenuLegend = {
        //     label: "menu_lbl_legends",
        //     href: "/legends",
        //     isActive: false
        // };
        // var subMenuLogout = {
        //     label: "menu_lbl_logout",
        //     href: "/logout",
        //     isActive: false
        // };

        var subMenuSdk = {
            label: "menu_lbl_sdk",
            isActive: false,
            menus: [
                {
                    label: "menu_lbl_sdk_doc",
                    href: "/sdk/doc/objtypes",
                    isActive: false
                },
                {
                    label: "menu_lbl_sdk_example",
                    href: "/sdk/example",
                    isActive: false
                }
            ]
        };
        var subMenuSdkDemoLogin = [
            {
                label: "menu_lbl_sdk_demo_login",
                href: "/sdk/demo",
                isActive: false
            }
        ];
        var subMenuSdkDemoLogout = [
            {
                label: "menu_lbl_sdk_demo_cmd",
                href: "/sdk/demo/cmd",
                isActive: false
            },
            {
                label: "menu_lbl_sdk_demo_evt",
                href: "/sdk/demo/evt",
                isActive: false
            },
            {
                label: "menu_lbl_sdk_demo_logout",
                href: "/sdk/demo/logout",
                isActive: false
            }
        ];

        function init() {
            //Found the current menu and set page title
            subMenuInit();
            setActiveItem(vm.menus);

            // vm.sessionUser = $atSession.getSessionUser();

            //Tell other controller that we are ready
            $rootScope.$broadcast("MenuController::isReady");
        }

        function subMenuInit(){
            // vm.menus.push(subMenuUser);
            // vm.menus.push(subMenuDoors);
            // vm.menus.push(subMenuArea);
            // vm.menus.push(subMenuConfig);
            // vm.menus.push(subMenuCamera);
            // vm.menus.push(subMenuEvents);
            // if (true == $atSession.getSetMasterEn()){
            //     vm.menus.push(subMenuHardwareCtrlSub);
            // }
            // else{
            //     vm.menus.push(subMenuHardwareCtrl);
            // }
            // vm.menus.push(subMenuLegend);
            for (var i=0; i<subMenuSdkDemoLogin.length; i++){
                subMenuSdk.menus.push(subMenuSdkDemoLogin[i]);
            }
            if (null != $sdkXmlSvc.getSetSessionKey()){
                for (i=0; i<subMenuSdkDemoLogout.length; i++){
                    subMenuSdk.menus.push(subMenuSdkDemoLogout[i]);
                }
            }
            vm.menus.push(subMenuSdk);

            if (window.innerWidth <= 767){
                vm.menus.push(subMenuLogout);
            }
        }

        function subMenu(obj) {
            return function (menus) {
                if (menus !== undefined) {
                    for (var i = 0; i < menus.length; i++) {
                        if (menus[i].href !== undefined) {
                            menus[i].isActive = (menus[i].href === $location.path());

                            if (menus[i].isActive){
                                vm.pageLabel = menus[i].label;
                            }
                        }
                    }
                }
            }(obj.menus);
        }
        function setActiveItem(obj) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].menus !== undefined){
                    subMenu(obj[i]);
                }
                else if (obj[i].href !== undefined) {
                    obj[i].isActive = (obj[i].href === $location.path());

                    if (obj[i].isActive){
                        vm.pageLabel = obj[i].label;
                    }
                }
            }
        }
        function onSetPageLabel (e, label) {
            vm.pageLabel = label;
            for (var i = 0; i < vm.menus.length; i++) {
                if (vm.menus[i].label !== undefined && vm.menus[i].label === label) {
                    vm.menus[i].isActive = true;
                }
                else if (vm.menus[i].menus !== undefined) {
                    for (var j = 0; j < vm.menus[i].menus.length; j++) {
                        if (vm.menus[i].menus[j].label !== undefined && vm.menus[i].menus[j].label === label) {
                            vm.menus[i].menus[j].isActive = true;
                            vm.menus[i].isActive = true;
                        }
                    }
                }
            }
        }

        var getLabel = function (label) {
            switch (label){
                case "menu_lbl_sdk":            return "SDK";
                case "menu_lbl_sdk_doc":        return "SDK Documentation";
                case "menu_lbl_sdk_example":    return "SDK Examples";
                case "menu_lbl_sdk_demo_login": return "SDK Demo - Login";
                case "menu_lbl_sdk_demo_cmd":   return "SDK Demo - Commands";
                case "menu_lbl_sdk_demo_evt":   return "SDK Demo - Events";
                case "menu_lbl_sdk_demo_logout":return "SDK Demo - Logout";
                case "menu_lbl_logout":         return "Logout";
                default:
                break;
            }
            // return $atLabel.get(label);
        }
        var onLogout = function () {
            $location.path("/sdk/demo/logout");
            // $location.path("/logout");
        }

        $scope.$on("MenuController::setPageLabel", onSetPageLabel);         //This can be updated by another controller (ex: doorController)

        // Public interface - var
        vm.isProcessing = false;
        vm.sessionUser = "";
        vm.menus = [];

        // Public interface - API
        vm.getLabel = getLabel;
        vm.onLogout = onLogout;

        init();

    }]);

})();