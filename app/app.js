angular.module("atServices", ["ngStorage"]);
angular.module("atControllers", []);
angular.module("atDirectives", []);
angular.module("atControllers", ["ngStorage"]);

var app = angular.module("atrium", ["atControllers", "atServices", "atControllers", "atDirectives", "ngRoute", "ngCookies"]);

//This enable ApplyAsync for all $http request (performance improvement)
app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.useApplyAsync(true);

    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
}]);

// app.run(["$rootScope", "$location", "$atSession", function ($rootScope, $location, $atSession) {

//     $rootScope.$on('$routeChangeStart', function (e, next, curr) {

//         //If route is secured and user is not authorized, return to login
//         if (next.isSecured && !$atSession.getSessionIsValid()) {
//             $atSession.setSessionIsValid(false);    //put session in invalid state
//             $location.path("/");
//         }
//     });

// }]);
