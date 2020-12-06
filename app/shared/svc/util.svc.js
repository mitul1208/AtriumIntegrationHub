(function () {

	var app = angular.module('atServices');

	app.factory('$utilSvc', function ObjTypesServiceFactory() {
		"use strict";

		var hex2int = function (hexx){
			var hex = hexx.toString();
			var val = 0;
			for (var i = 0; i < hex.length; i += 2){
				val *= 256;
				val += parseInt(hex.substr(i, 2), 16);
			}
			return val;
		}
        var hex2a = function (hexx) {
			var hex = hexx.toString();
			var str = '';
			for (var i = 0; i < hex.length; i += 2){
				str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
			}
			return str;
		}
        var a2hex = function(a) {
			var str = '';
            for (var y = 0; y < a.length; y++) {
                str += a.charCodeAt(y).toString(16).pad("0", 2).toUpperCase();
            }
			return str;
		}

		//Public Interface
		return {
			hex2int: hex2int,
			hex2a: hex2a,
            a2hex: a2hex
		};
	});

})();

