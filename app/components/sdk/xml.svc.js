(function () {

	var app = angular.module('atServices');

	app.factory('$sdkXmlSvc', ['$http', '$location', '$localStorage', '$sdkObjTypeSvc',
		function ($http, $location, $localStorage, $sdkObjTypeSvc) {
		"use strict";

		var x2js = new X2JS();
		var h_onSdkItemFound = [];

		function onSdkItemFound(elemTagName, ans, data) {
			for (var i=0; i<h_onSdkItemFound.length; i++){
				h_onSdkItemFound[i](elemTagName, ans, data);
			}
		}
		function parseSdkFile(sdkFile, ans){
            var i;
            if (null != sdkFile){
				if (undefined != sdkFile.SDK){
					if (undefined != sdkFile.SDK.RECORDS){
						if (undefined != sdkFile.SDK.RECORDS.REC){
							if (undefined == sdkFile.SDK.RECORDS.REC.length){
								onSdkItemFound("REC", ans, sdkFile.SDK.RECORDS.REC);
							}
							else{
								for (i=0; i<sdkFile.SDK.RECORDS.REC.length; i++){
									onSdkItemFound("REC", ans, sdkFile.SDK.RECORDS.REC[i]);
								}
							}
						}
					}
					if (undefined != sdkFile.SDK.COMMANDS){
						if (undefined != sdkFile.SDK.COMMANDS.CMD){
							if (undefined == sdkFile.SDK.COMMANDS.CMD.length){
								onSdkItemFound("CMD", ans, sdkFile.SDK.COMMANDS.CMD);
							}
							else{
								for (i=0; i<sdkFile.SDK.COMMANDS.CMD.length; i++){
									onSdkItemFound("CMD", ans, sdkFile.SDK.COMMANDS.CMD[i]);
								}
							}
						}
					}
					if (undefined != sdkFile.SDK.EVENTS){
						if (undefined != sdkFile.SDK.EVENTS.EVT){
							if (undefined == sdkFile.SDK.EVENTS.EVT.length){
								onSdkItemFound("EVT", ans, sdkFile.SDK.EVENTS.EVT);
							}
							else{
								for (i=0; i<sdkFile.SDK.EVENTS.EVT.length; i++){
									onSdkItemFound("EVT", ans, sdkFile.SDK.EVENTS.EVT[i]);
								}
							}
						}
                    }
					if (undefined != sdkFile.SDK.TREES){
						if (undefined != sdkFile.SDK.TREES.TREE){
							if (undefined == sdkFile.SDK.TREES.TREE.length){
								onSdkItemFound("TREE", ans, sdkFile.SDK.TREES.TREE);
							}
							else{
								for (i=0; i<sdkFile.SDK.TREES.TREE.length; i++){
									onSdkItemFound("TREE", ans, sdkFile.SDK.TREES.TREE[i]);
								}
							}
						}
					}
				}
			}
		}
		var encryptXml = function(xmlData){
            if (getSetSessionKey() !== null) {
				var strRaw = xmlData;
				xmlData = "post_enc=" + rc4(getSetSessionKey(), strRaw) + "&post_chk=" + postChkCalc(strRaw);
            }
			return xmlData;
		}
		var decryptXml = function(xmlData){
			var postEnc = "post_enc=";
			var IdxEnc = xmlData.search(postEnc);
			if (IdxEnc >= 0){
				IdxEnc = IdxEnc + postEnc.length;
				var postChk = "&post_chk=";
				var IdxChk = xmlData.search(postChk);
				if (IdxChk >= 0){
					var chkSumPost = xmlData.substr(IdxChk + postChk.length);
					xmlData = xmlData.substr(IdxEnc, (IdxChk - IdxEnc));
					if (getSetSessionKey() !== null) {
						xmlData = rc4Decrypt(getSetSessionKey(), xmlData);
						var chkSumCalc = postChkCalc(xmlData);
						chkSumCalc = parseInt(chkSumCalc, 16);
						chkSumCalc &= 65535;
						chkSumPost = parseInt(chkSumPost, 16);
						// console.debug("rx:\r\n" + xmlData + "\r\nchkPost: " + chkSumPost + "\r\nchkCalc: " + chkSumCalc);
						if (chkSumPost == chkSumCalc){
							return xmlData;
						}
					}
				}
				return null;
			}
			return xmlData;
		}

		function parseXml(xmlData, onSuccess, onFailure) {
			xmlData = decryptXml(xmlData);
			if (null != xmlData){
				//we received xml data. convert it to json before calling callback
				var json = x2js.xml_str2json(xmlData);
				parseSdkFile(json, true);
				if ($.isFunction(onSuccess)) {
					onSuccess(json);
				}
			}
			else{
				if ($.isFunction(onFailure)) {
					onFailure();
				}
				console.error("$sdkXmlSvc parseXml error - Fail to decrypt data");
			}
		}
		function onError(url, response, onFailure) {
			//Session expired
			if (response.status == 403) {
				$location.path("/sdk/demo");
				return;
			}
			if ($.isFunction(onFailure)) {
				onFailure(response);
			}
			console.error("$sdkXmlSvc error callback - url: " + url + ", status: " + response.status + ", msg: " + response.statusText);
		}
		function appendRecData(jsonData, rqst){
			for (var objId = rqst.idMin; objId<=rqst.idMax; objId++){
				var objData = {};
				var dataEnabled = false;
				if (null != rqst.data){
					for (var i=0; i<rqst.data.length; i++){
						if ((true === rqst.data[i].check) &&
							(null != rqst.data[i].dataTbl)){
							for (var idx=0; idx<rqst.data[i].dataTbl.length; idx++){
								var tagName = "_" + rqst.data[i].tagName;
								if (rqst.data[i].dataTbl.length > 1){
									tagName = tagName + "_" + idx;
								}
								var tagData = rqst.data[i].dataTbl[idx].data;
								if (("read" == rqst.cmd) ||
									(null === tagData)) {
									tagData = "";
								}
								else if (true === tagData){
									tagData = '1';
								}
								else if (false === tagData){
									tagData = '0';
								}
								var objTag = {};
								objTag[tagName] = tagData;
								objData = angular.extend(objData, objTag);
								dataEnabled = true;
							}
						}
					}
				}
				if (true === dataEnabled){
					jsonData = angular.extend(jsonData, {DATA: objData});
				}
			}
        }
		function jsonToXmlPost(sdkFile, enc, onSuccess, onFailure){
			parseSdkFile(sdkFile, false);
			sdkFile = jsonToXml(sdkFile);
			if (true === enc){
				xmlPostEncrypted(getSetBaseUrl() + "sdk.xml", sdkFile, onSuccess, onFailure);
			}
			else{
				xmlPost(getSetBaseUrl() + "sdk.xml", sdkFile, onSuccess, onFailure);
			}
		}

        var getSetBaseUrl = function (url) {
            if (undefined !== url){
                if (url.charAt(url.length - 1) != "/"){
                    url = url + "/"
                }
                $localStorage.baseUrl = url;
				$localStorage.$save();
            }
            else if (!angular.isDefined($localStorage.baseUrl)){
                $localStorage.baseUrl = "";
				$localStorage.$save();
            }
            return $localStorage.baseUrl;
        };

		var getSetSessionKey = function (sessionKey) {
            if (undefined !== sessionKey){
                $localStorage.sessionKey = sessionKey;
				$localStorage.$save();
            }
            else if (!angular.isDefined($localStorage.sessionKey)){
                $localStorage.sessionKey = null;
				$localStorage.$save();
            }
            return $localStorage.sessionKey;
        };

		var getTrxId = function () {
            if (!angular.isDefined($localStorage.sdkTrxId)){
                $localStorage.sdkTrxId = 0;
            }
			$localStorage.sdkTrxId++;
			$localStorage.$save();
            return $localStorage.sdkTrxId;
        };

        var getSetTargetSerial = function (serial) {
            if (undefined !== serial){
                $localStorage.targetSerial = serial;
				$localStorage.$save();
            }
            else if (!angular.isDefined($localStorage.targetSerial)){
                $localStorage.targetSerial = "";
				$localStorage.$save();
            }
            return $localStorage.targetSerial;
        };

        var getSetObjTypeDisp = function (objTypeDisp) {
            if (undefined !== objTypeDisp){
                $localStorage.objTypeDisp = objTypeDisp;
				$localStorage.$save();
            }
            else if (!angular.isDefined($localStorage.objTypeDisp)){
                $localStorage.objTypeDisp = "basic";
				$localStorage.$save();
            }
            return $localStorage.objTypeDisp;
        };

        var getSetTagDisp = function (tagDisp) {
            if (undefined !== tagDisp){
                $localStorage.tagDisp = tagDisp;
				$localStorage.$save();
            }
            else if (!angular.isDefined($localStorage.tagDisp)){
                $localStorage.tagDisp = "basic";
				$localStorage.$save();
            }
            return $localStorage.tagDisp;
        };

		var xmlGet = function (url, onSuccess, onFailure) {
			var promise = $http({
				method: 'GET',
				url: url
			}).
			then(function (response) {
				parseXml(response.data, onSuccess, onFailure);
			}).catch(function (response) {
				onError(url, response, onFailure);
				throw response;
			});
			return promise;
		}
		var xmlPost = function (url, xmlData, onSuccess, onFailure) {
			// console.debug('xmlTx: ', xmlData);
			var promise = $http({
				method: 'POST',
				url: url,
				data: xmlData,
				cors: false,
				headers: {
					'Content-Type': undefined
				}
			}).
			then(function (response) {
				parseXml(response.data, onSuccess, onFailure);
			}).catch(function (response) {
				onError(url, response, onFailure);
				throw response;
			});
			return promise;
		}
		var xmlPostEncrypted = function (url, xmlData, onSuccess, onFailure) {
			xmlData = encryptXml(xmlData);
            return xmlPost(url, xmlData, onSuccess, onFailure);
        }

		var jsonToXml = function (objJson) {
			if (null != objJson) {
				var xmlData = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
				xmlData = xmlData + x2js.json2xml_str(objJson);
				return xmlData;
			}
			return null;
		}

		var jsonGet = function (url, onSuccess, onFailure) {
			//Add random param to prevent caching
			url = url + (-1 === url.indexOf("?") ? "?" : "&") + "_=" + new Date().getTime();
			var promise = $http({
				method: 'GET',
				url: getSetBaseUrl() + url
			}).
			then(function (response) {
				parseXml(response.data, onSuccess, onFailure);
			}).catch(function (response) {
				onError(url, response, onFailure);
				throw response;
			});
			return promise;
		}
		var jsonPost = function (url, jsonData, onSuccess, onFailure) {
			var dataUri = $.param(jsonData); //convert json to URI
			var promise = $http({
				method: 'POST',
				url: getSetBaseUrl() + url,
				data: dataUri
			}).
			then(function (response) {
				parseXml(response.data, onSuccess, onFailure);
			}).catch(function (response) {
				onError(url, response, onFailure);
				throw response;
			});
			return promise;
		}

		var craftSdkFile = function(obj, sdkFile){
			if (undefined === sdkFile){
				sdkFile = {
					SDK: {
						_xmlns: "https://www.cdvi.ca/"
					}
				};
			}
			if (undefined != obj.REC){
				if (undefined === sdkFile.SDK.RECORDS){
					sdkFile.SDK = angular.extend(sdkFile.SDK, {RECORDS: {}});
				}
				if (undefined === sdkFile.SDK.RECORDS.REC){
					sdkFile.SDK.RECORDS = angular.extend(sdkFile.SDK.RECORDS, {REC: []});
				}
				sdkFile.SDK.RECORDS.REC.push(obj.REC);
			}
			if (undefined != obj.CMD){
				if (undefined === sdkFile.SDK.COMMANDS){
					sdkFile.SDK = angular.extend(sdkFile.SDK, {COMMANDS: {}});
				}
				if (undefined === sdkFile.SDK.COMMANDS.CMD){
					sdkFile.SDK.COMMANDS = angular.extend(sdkFile.SDK.COMMANDS, {CMD: []});
				}
				sdkFile.SDK.COMMANDS.CMD.push(obj.CMD);
			}
			if (undefined != obj.EVT){
				if (undefined === sdkFile.SDK.EVENTS){
					sdkFile.SDK = angular.extend(sdkFile.SDK, {EVENTS: {}});
				}
				if (undefined === sdkFile.SDK.EVENTS.EVT){
					sdkFile.SDK.EVENTS = angular.extend(sdkFile.SDK.EVENTS, {EVT: []});
				}
				sdkFile.SDK.EVENTS.EVT.push(obj.EVT);
            }
			if (undefined != obj.TREE){
				if (undefined === sdkFile.SDK.TREES){
					sdkFile.SDK = angular.extend(sdkFile.SDK, {TREES: {}});
				}
				if (undefined === sdkFile.SDK.TREES.TREE){
					sdkFile.SDK.TREES = angular.extend(sdkFile.SDK.TREES, {TREE: []});
				}
				sdkFile.SDK.TREES.TREE.push(obj.TREE);
			}
			if (undefined != obj.LOGIN_SDK){
				sdkFile = {
					LOGIN_SDK: obj.LOGIN_SDK
				};
			}
			return sdkFile;
		}
		var craftRec = function(rqst, recTag){
			var rec = {
				_trans_id: getTrxId(),
				_cmd: rqst.cmd,
				_sernum: rqst.serial,
				_type: rqst.objType,
			};
			if (undefined != rqst.idMin){
				rqst.idMin = rqst.idMin || "";
				rqst.idMax = rqst.idMax || "";
				if ("" === rqst.idMin){
					rqst.idMin = 0;
				}
				if (("" === rqst.idMax) ||
					(rqst.idMin > rqst.idMax)) {
					rqst.idMax = rqst.idMin;
				}
				if (rqst.idMax == rqst.idMin){
					rec = angular.extend(rec, {_id: rqst.idMin});
				}
				else{
					rec = angular.extend(rec, {_id_min: rqst.idMin});
					rec = angular.extend(rec, {_id_max: rqst.idMax});
				}
			}
			if (undefined != recTag){
				rec = angular.extend(rec, {_rec: recTag});
            }
            if (angular.isDefined(rqst.cnt)) {
                rec = angular.extend(rec, {_cnt: rqst.cnt});
            }
			appendRecData(rec, rqst);
			return rec;
		}

		// <EVT trans_id="14" sernum="0A221037" cmd="read" id_min="1" id_max="10" />
		// <EVT trans_id="15" sernum="0A221037" type_min="0" type_max="300" last_ts_utc="-1" last_sernum="FFFFFFFF" last_num="-1" cmd="query" id_min="1" id_max="65535" />
		var craftEvt = function(rqst){
			var evt = {
				_trans_id: getTrxId(),
				_cmd: rqst.cmd,
				_sernum: rqst.serial,
			};

			rqst.idMin = rqst.idMin || "";
			rqst.idMax = rqst.idMax || "";

			if ("" === rqst.idMin){
                rqst.idMin = 0;
            }
            if (("" === rqst.idMax) ||
				(rqst.idMin > rqst.idMax)) {
                rqst.idMax = rqst.idMin;
            }

			if (rqst.idMax == rqst.idMin){
				evt = angular.extend(evt, {_id: rqst.idMin});
			}
			else{
				evt = angular.extend(evt, {_id_min: rqst.idMin});
				evt = angular.extend(evt, {_id_max: rqst.idMax});
			}

			if (rqst.ojbTypeMin != 0){
				evt = angular.extend(evt, {_type_min: rqst.ojbTypeMin});
			}
			if (rqst.ojbTypeMax != "FFFFFFFF"){
				evt = angular.extend(evt, {_type_max: rqst.ojbTypeMax});
			}

			if (rqst.cmd != "read"){
				if (rqst.lastTsStr != -1){
					evt = angular.extend(evt, {_last_ts_str: rqst.lastTsStr});
				}
				if (rqst.lastSernum != -1){
					evt = angular.extend(evt, {_last_sernum: rqst.lastSernum});
				}
				if (rqst.lastNum != -1){
					evt = angular.extend(evt, {_last_num: rqst.lastNum});
				}
			}

			return evt;
        }
        // <TREE trans_id="15" cmd="user_first_name" />
        //   <DATA utf0="john" dword1="0" />
        //   <DATA utf0="john" dword1="-1" />
        // </TREE>
		var craftTree = function(rqst){
			var tree = {
				_trans_id: getTrxId(),
                _cmd: rqst.cmd,
                DATA: []
            };
            if (angular.isDefined(rqst.keyStart)) {
                tree.DATA.push(rqst.keyStart);
            }
            if (angular.isDefined(rqst.keyEnd)) {
                tree.DATA.push(rqst.keyEnd);
            }
			return tree;
		}

		var sdkParserCallbackRegister = function(onSdkItemFoundCallback){
			if ($.isFunction(onSdkItemFoundCallback)) {
				for (var i=0; i<h_onSdkItemFound.length; i++){
					if (h_onSdkItemFound[i] === onSdkItemFoundCallback){
						return;
					}
				}
				h_onSdkItemFound.push(onSdkItemFoundCallback);
			}
		}

		//<REC trans_id="2" cmd="write" sernum="0A221037" type="user" id_min="1" id_max="1" rec="cfg" >
		//	<DATA word25="124" />
		//</REC>
		var postRec = function (rqst, onSuccess, onFailure) {
			var json = {
				REC: craftRec(rqst, rqst.recTag)
			};
			var sdkFile = craftSdkFile(json);
			jsonToXmlPost(sdkFile, true, onSuccess, onFailure);
		}
		//<CMD trans_id="11" cmd="unlock" sernum="0A221037" type="door" id_min="0" id_max="1" />
		var postCmd = function (rqst, onSuccess, onFailure) {
			var json = {
				CMD: craftRec(rqst, rqst.recTag)
			};
			var sdkFile = craftSdkFile(json);
			jsonToXmlPost(sdkFile, true, onSuccess, onFailure);
		}
		//<EVT trans_id="16" sernum="0A221037" type_min="0" type_max="300" last_ts_utc="-1" last_sernum="FFFFFFFF" last_num="-1" cmd="query_read" id_min="1" id_max="65535" />
		var postEvt = function (rqst, onSuccess, onFailure) {
			var json = {
				EVT: craftEvt(rqst)
			};
			var sdkFile = craftSdkFile(json);
			jsonToXmlPost(sdkFile, true, onSuccess, onFailure);
        }
        // <TREE trans_id="15" cmd="user_first_name" />
        //   <DATA utf0="john" dword1="0" />
        //   <DATA utf0="johnFFFFFFFFFFFFFFF" dword1="-1" />
        // </TREE>
		var postTree = function (rqst, onSuccess, onFailure) {
			var json = {
				TREE: craftTree(rqst)
			};
			var sdkFile = craftSdkFile(json);
			jsonToXmlPost(sdkFile, true, onSuccess, onFailure);
        }

		var xmlPrettify = function (xml) {
			var reg = /(>)\s*(<)(\/*)/g;
			var wsexp = / *(.*) +\n/g;
			var contexp = /(<.+>)(.+\n)/g;
			xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
			var pad = 0;
			var formatted = '';
			var lines = xml.split('\n');
			var indent = 0;
			var lastType = 'other';
			// 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
			var transitions = {
				'single->single'    : 0,
				'single->closing'   : -1,
				'single->opening'   : 0,
				'single->other'     : 0,
				'closing->single'   : 0,
				'closing->closing'  : -1,
				'closing->opening'  : 0,
				'closing->other'    : 0,
				'opening->single'   : 1,
				'opening->closing'  : 0,
				'opening->opening'  : 1,
				'opening->other'    : 1,
				'other->single'     : 0,
				'other->closing'    : -1,
				'other->opening'    : 0,
				'other->other'      : 0
			};

			for (var i=0; i < lines.length; i++) {
				var ln = lines[i];
				var single = Boolean(ln.match(/<.+\/>/) || ln.match(/<\?.+\?>/)); // is this line a single tag? ex. <br />
				var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
				var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
				var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
				var fromTo = lastType + '->' + type;
				lastType = type;
				var padding = '';
				indent += transitions[fromTo];
				for (var j = 0; j < indent; j++) {
					padding += '    ';
				}
				formatted += padding + ln + '\n';
			}
			return formatted;
		};

		//Public Interface
		return {
			getSetBaseUrl: getSetBaseUrl,
			getSetTargetSerial: getSetTargetSerial,
			getSetSessionKey: getSetSessionKey,
            getSetObjTypeDisp: getSetObjTypeDisp,
			getSetTagDisp: getSetTagDisp,
			getTrxId: getTrxId,
			encryptXml: encryptXml,
			decryptXml: decryptXml,
			xmlGet: xmlGet,
			xmlPost: xmlPost,
			jsonGet: jsonGet,
			jsonPost: jsonPost,
			jsonToXml: jsonToXml,
			xmlPrettify: xmlPrettify,
			craftRec: craftRec,
			craftEvt: craftEvt,
			craftSdkFile: craftSdkFile,
			sdkParserCallbackRegister: sdkParserCallbackRegister,
			postRec: postRec,
			postCmd: postCmd,
            postEvt: postEvt,
            postTree: postTree
		};
	}]);

})();