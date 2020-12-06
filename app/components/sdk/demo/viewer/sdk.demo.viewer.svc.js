(function () {

	var app = angular.module('atControllers');

	app.factory('$sdkHistorySvc', ['$sdkXmlSvc',
		function ($sdkXmlSvc) {
		"use strict";

		var objList = [];

		var all = function() {
			return objList;
		}
		var create = function(elemTagName, ans, data) {
			var obj = {
				label: elemTagName,
				ans: ans,
				err: "request",
				type: null,
				cmd: data._cmd || "",
				trxId: 0,
				data: data
			};

			if (angular.isDefined(data._trans_id)){
				obj.trxId = data._trans_id;
			}
			else{
				obj.trxId = $sdkXmlSvc.getTrxId();
			}
			if ((elemTagName === "REC") ||
				(elemTagName === "CMD")){
				obj.type = data._type;
				obj.err = data._res;
			}
			else if (elemTagName === "EVT"){
				obj.type = "EVT";
				obj.err = data._res;
            }
			else if (elemTagName === "TREE"){
				obj.type = "TREE";
				obj.err = data._res;
			}
			else if ("LOGIN_SDK" === elemTagName){
				obj.type = "login";
				if (angular.isDefined(data.CONNECTION)){
					obj.err = data.CONNECTION._err;
				}
			}
			objList.push(obj);
			// console.debug('Demo obj insert: ', obj.trxId);
			return all();
		}
		var empty = function(){
			objList = [];
		}
		var getObj = function(trxId, ans) {
			for (var i = 0; i < objList.length; i++) {
				if (trxId == objList[i].trxId) {
					if (ans == objList[i].ans){
						return objList[i];
					}
				}
			}
			return null;
		}

		//Public Interface
		return {
			all: all,
			create: create,
			empty: empty,
			getObj: getObj,
		};
	}]);

})();