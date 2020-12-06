(function(){

	var app = angular.module('atDirectives');

    app.directive('tagData', ['$sdkTagDataSvc', '$compile', '$parse',
      function ($sdkTagDataSvc, $compile, $parse) {
      "use strict";

      return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
          tag: "=",
          data: "=",
          objstatustbl: "=",
          disableget: "&",
          checktag: "&"
        },
        controller: function ($scope, $element) {
          var directives = [
            { format: "text",      dir: "tag-data-text"       },
            { format: "objStatus", dir: "tag-data-obj-status" },
            { format: "number",    dir: "tag-data-number"     },
            { format: "bit",       dir: "tag-data-bit"        },
            { format: "hex",       dir: "tag-data-hex"        },
            { format: "bitField",  dir: "tag-data-bit-field"  },
            { format: "time",      dir: "tag-data-time"       },
            { format: "ip",        dir: "tag-data-ip"         },
            { format: "email",     dir: "tag-data-email"      },
            { format: "url",       dir: "tag-data-url"        },
            { format: "pswd",      dir: "tag-data-pswd"       },
            { format: "key",       dir: "tag-data-pswd"       },
          ]

          this.getdir = function(tagName){
            var objFormat = $sdkTagDataSvc.objFormatGet(tagName);
            for (var i=0; i<directives.length; i++){
              if (directives[i].format == objFormat.format){
                return directives[i].dir;
              }
            }
            return directives[0].dir;
          }
        },
        link: function (scope, element, attr, tagDataCtrl) {
          var elemTag = tagDataCtrl.getdir(scope.tag.tagName);
          element.html('');
          $compile('<' + elemTag +' tag="tag" data="data" objstatustbl="objstatustbl" disableget="disableget(tag)" checktag="checktag(tag)"></' + elemTag + '>')(scope, function(cloned, scope){
            element.eq(0).append(cloned);
          });
        }
      };
    }])

    app.directive("tagDataText", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="text" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataObjStatus", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<select ng-model="data" ng-options="item for item in objstatustbl" ng-disabled="disableget(tag)" ng-change="checktag(tag);">{{data}}</select>';
            },
            scope: {
              tag: "=",
              data: "=",
              objstatustbl: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataNumber", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="number" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="Text" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataBit", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<div class="btn-group" role="group" >' +
                      '<button type="button" ng-class="{active: data!=1}" class="btn btn-sm btn-default" ng-disabled="disableget(tag)" ng-click="data=0; checktag(tag);">Disabled</button>' +
                      '<button type="button" ng-class="{active: data==1}" class="btn btn-sm btn-default" ng-disabled="disableget(tag)" ng-click="data=1; checktag(tag);">Enabled</button>' +
                      '</div>';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataHex", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              //pattern="[A-Fa-f0-9]"
              return '<input type="text" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="Hexa-decimal value" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataBitField", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="text" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="Bit field value in hex" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataTime", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="text" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="Time in posix" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataIp", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              //pattern="((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$"
              return '<input type="text" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="IPv4 IP address" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataEmail", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="email" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="Email address" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataUrl", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="url" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="URL" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

    app.directive("tagDataPswd", function () {
        "use strict";
        var ddo = {
            restrict: "E",
            template: function(elem, attr){
              return '<input type="password" class="input-md" ng-model="data" ng-disabled="disableget(tag)" ng-change="checktag(tag);" title="Password" />';
            },
            scope: {
              tag: "=",
              data: "=",
              disableget: "&",
              checktag: "&"
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
        return ddo;
    });

})();
