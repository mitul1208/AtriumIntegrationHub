(function () {

	var app = angular.module('atControllers');

	app.factory('$sdkDeviceSvc', ['$sdkXmlSvc', '$sdkObjTypeSvc', '$sdkTagDataSvc',
		function ($sdkXmlSvc, $sdkObjTypeSvc, $sdkTagDataSvc) {
		"use strict";

		var deviceList = [];
		var parseObjTypeTbl = [
			{
				type:    "mdl_tbl",
				rec:	 "cfg",
				cmd: 	 undefined,
				callback: onParseMdlTblCfg
			},
			{
				type:    "ip_client",
				rec:	 "cfg",
				cmd: 	 undefined,
				callback: onParseIpClientCfg
			},
			{
				type:    undefined,
				rec:	 undefined,
				cmd: 	 "info",
				callback: onParseObjTypeInfo
			},
			{
				type:    undefined,
				rec:	 "info",
				cmd: 	 "read",
				callback: onParseObjTypeInfo
			}
		];

		function init (){
			var sn = $sdkXmlSvc.getSetTargetSerial();
			if ("" != sn){
				var device 	  = getDeviceBySerial(sn);
				device.master = sn;
				device.url    = $sdkXmlSvc.getSetBaseUrl();
				if (null == device.label){
					device.label = "System master";
				}
			}
		}
		function attrIdxStrGet(attr){
            var idxStart = attr.lastIndexOf("_");
            if (idxStart > 0){
                attr = attr.substr(idxStart);
                idxStart = attr.search("[0-9]");           // Trim ending _[0-9]
                if (idxStart == 1){
                    return attr;
                }
            }
    		return null;
		}
		function attrTagGet(attr){
			while (attr.charAt(0) === '_'){                 // Trim starting '_'
				attr = attr.substr(1);
			}
            var idxStr = attrIdxStrGet(attr);
            if (null != idxStr){
                attr = attr.substr(0, (attr.length - idxStr.length));
            }

    		return attr;
		}
		function attrIdxGet(attr){
            var idxStr = attrIdxStrGet(attr);
            if (null != idxStr){
       			while (idxStr.charAt(0) === '_'){                 // Trim starting '_'
                    idxStr = idxStr.substr(1);
                }
                return parseInt(idxStr, 10);
            }
    		return 0;
		}

		function onParseObjTypeInfo (dataInfo, obj, tagName, data){
			if (angular.isDefined(tagName)){				// new tag received
				if (tagName == "_dword1"){
					getSetObjIdUsed(dataInfo._sernum, dataInfo._type, data);
				}
				else if (tagName == "_dword2"){
					getSetObjIdMax(dataInfo._sernum, dataInfo._type, data);
				}
			}
		}
		function onParseMdlTblCfg (dataInfo, obj, tagName, data){
			if (angular.isDefined(tagName)){				// new tag received
				if (tagName == "_serial1"){
					obj = angular.extend(obj, {serial: data});
				}
				else if (tagName == "_utf2"){
					obj = angular.extend(obj, {label: data});
				}
				else if (tagName == "_obj_status"){
					obj = angular.extend(obj, {objStatus: data});
				}
			}
			else{									// completed
				if ((undefined != obj.serial) &&
					(undefined != obj.objStatus)){
					if ("used" == obj.objStatus){
						setDeviceInfo(obj.serial, dataInfo._sernum, obj.label);
					}
				}
			}
		}
		function onParseIpClientCfg (dataInfo, obj, tagName, data){
			if (angular.isDefined(tagName)){				// new tag received
				if (tagName == "_serial3"){
					obj = angular.extend(obj, {serial: data});
				}
				else if (tagName == "_label2"){
					obj = angular.extend(obj, {label: data});
				}
				else if (tagName == "_obj_status"){
					obj = angular.extend(obj, {objStatus: data});
				}
			}
			else{									// completed
				if ((undefined != obj.serial) &&
					(undefined != obj.objStatus)){
					if ("used" == obj.objStatus){
						setDeviceInfo(obj.serial, dataInfo._sernum, obj.label);
					}
				}
			}
		}
		function onParseObjType (dataInfo, obj, tagName, data){
			for (var i=0; i<parseObjTypeTbl.length; i++){
				if ((dataInfo._type == parseObjTypeTbl[i].type) ||
					(undefined == parseObjTypeTbl[i].type)){
					if ((dataInfo._rec == parseObjTypeTbl[i].rec) ||
						(undefined == parseObjTypeTbl[i].rec)){
						if ((dataInfo._cmd == parseObjTypeTbl[i].cmd) ||
						    (undefined == parseObjTypeTbl[i].cmd)){
							parseObjTypeTbl[i].callback(dataInfo, obj, tagName, data);
							return;
						}
					}
				}
			}
		}
		function parseSdkRecData(dataInfo, dataToParse){
			if ((dataToParse._id != undefined) && (dataToParse._res != undefined)){
				if ("ok" === dataToParse._res){
					var obj = {};
					for(var tagName in dataToParse)
					{
						if ((tagName != "_id") && (tagName != "_res")){
							var objId = getObjId(dataInfo._sernum, dataInfo._type, dataInfo._rec, dataToParse._id);
							getSetTagData(objId, attrTagGet(tagName), attrIdxGet(tagName), dataToParse[tagName]);
							onParseObjType(dataInfo, obj, tagName, dataToParse[tagName]);
						}
					}
					onParseObjType(dataInfo, obj);			// on data parse completion
				}
			}
		}
		var onSdkItemParse = function(elemTagName, ans, data) {
			if ((true == ans) &&
			    ("REC" === elemTagName)){
				if ("ok" === data._res){
                    if (angular.isDefined(data.DATA)) {
                        if (undefined == data.DATA.length){
                            parseSdkRecData(data, data.DATA);
                        }
                        else{
                            for (var i=0; i<data.DATA.length; i++){
                                parseSdkRecData(data, data.DATA[i]);
                            }
                        }
                    }
				}
			}
		}

		var all = function () {
			return deviceList;
		}
		var getDeviceListByUrl = function (url){
			var devices = [];
			for (var i=0; i<deviceList.length; i++){
				if (deviceList[i].url == url){
					devices.push(deviceList[i]);
				}
			}
			return devices;
		}
		var getDeviceListByMaster = function (serialMaster){
			var devices = [];
			for (var i=0; i<deviceList.length; i++){
				if (deviceList[i].master == serialMaster){
					devices.push(deviceList[i]);
				}
			}
			return devices;
		}
		var setDeviceInfo = function (serial, serialMaster, label, url){
			var device = getDeviceBySerial(serial);
			if (null != device){
				device.master = serialMaster;
				if (undefined != url){
					device.url = url;
				}
				if (undefined != label){
					device.label = label;
				}
			}
		}
		var getDeviceBySerial = function (deviceSerial){
			for (var i=0; i<deviceList.length; i++){
				if (deviceList[i].serial == deviceSerial){
					return deviceList[i];
				}
			}
			var deviceNew = {
				serial: deviceSerial,
				master: null,
				url: null,
				label: null,
				objTypes: []
			};
			deviceList.push(deviceNew);
			return deviceNew;
		}
		var getObjType = function (serial, objTypeTag){
			var device = getDeviceBySerial(serial);
			for (var i=0; i<device.objTypes.length; i++){
				if (device.objTypes[i].objType == objTypeTag){
					return device.objTypes[i];
				}
			}
			var objTypeNew = {
				objType: objTypeTag,
				numObjIdMax: $sdkObjTypeSvc.getNumObjIdDflt(objTypeTag),
				numObjIdUsed: 0,
				records: []
			};
			device.objTypes.push(objTypeNew);
			return objTypeNew;
		}
		var getRec = function (serial, objTypeTag, recTag){
			var objType = getObjType(serial, objTypeTag);
			for (var i=0; i<objType.records.length; i++){
				if (objType.records[i].rec == recTag){
					return objType.records[i];
				}
			}
			var recNew = {
				rec: recTag,
				ids: []
			};
			objType.records.push(recNew);
			return recNew;
		}
		var getObjId = function (serial, objTypeTag, recTag, idToFind){
			var objRec = getRec(serial, objTypeTag, recTag);
			for (var i=0; i<objRec.ids.length; i++){
				if (objRec.ids[i].id == idToFind){
					return objRec.ids[i];
				}
			}
			var objIdNew = {
				id: idToFind,
				cnt: 0
			};
			craftRecTag(objTypeTag, recTag, objIdNew);
			objRec.ids.push(objIdNew);
			return objIdNew;
		}

		var craftRecTag = function (objTypeTag, recTag, objId){
			var objType = $sdkObjTypeSvc.getByObjTypeTag(objTypeTag);
			var objRec = $sdkObjTypeSvc.getRecTbl(objType, recTag);
			if (null === objRec){
				objRec = $sdkObjTypeSvc.getCmdTbl(objType, recTag);
			}
			if (null != objRec) {
				if (null != objRec.tblTags){
					for (var i=0; i<objRec.tblTags.length; i++){
						var objTag = {};
						objTag[objRec.tblTags[i].tagName] = new Array(objRec.tblTags[i].numItem);
						for (var idx=0; idx<objTag[objRec.tblTags[i].tagName].length; idx++){
							objTag[objRec.tblTags[i].tagName][idx] = {
								data: null
							};
						}
						objId = angular.extend(objId, objTag);
					}
				}
			}
		}

		var getSetTagData = function (objId, tagName, idx, value){
			if (objId != null){
				for (var tag in objId){
					if (tag === tagName){
						if (value != undefined){
							var objFormat = $sdkTagDataSvc.objFormatGet(tagName);
							if (objFormat.format == "number"){
								value = parseInt(value);
							}
						}
						if (objId[tag].length != undefined){
							if (idx < objId[tag].length){
								if (value != undefined){
									if (!angular.isDefined(objId[tag][idx].data)){
										objId[tag][idx] = {
											data: null
										};
									}
									objId[tag][idx].data = value;
								}
								return objId[tag][idx].data;
							}
						}
						else{
							if (value != undefined){
								if (!angular.isDefined(objId[tag].data)){
									objId[tag] = {
										data: null
									};
								}
								objId[tag].data = value;
							}
							return objId[tag].data;
						}
					}
				}

			}
			return null;
		}
		var getSetObjIdMax = function (serial, objTypeTag, numObjIdMax){
			var objType = getObjType(serial, objTypeTag);
			if (undefined != numObjIdMax){
				objType.numObjIdMax = numObjIdMax;
			}
			return objType.numObjIdMax;
		}
		var getSetObjIdUsed = function (serial, objTypeTag, numObjIdUsed){
			var objType = getObjType(serial, objTypeTag);
			if (undefined != numObjIdUsed){
				objType.numObjIdUsed = numObjIdUsed;
			}
			return objType.numObjIdUsed;
		}
		var fetchObjIdInfo = function (serial, objTypeTag, onSuccess, onFailure){
			var rqst = {
				cmd: "info",
				recTag: undefined,
				serial: serial,
				objType: objTypeTag,
				idMin: undefined,
				idMax: undefined,
				data: null
			};
			$sdkXmlSvc.postRec(rqst, onSuccess, onFailure);
		}

		init();													// Init service

		//Public Interface
		return {
			all: all,
			getDeviceListByUrl: getDeviceListByUrl,
			getDeviceListByMaster: getDeviceListByMaster,
			getDeviceBySerial: getDeviceBySerial,
			setDeviceInfo: setDeviceInfo,
			getObjType: getObjType,
			getRec: getRec,
			getObjId: getObjId,
			getSetObjIdMax: getSetObjIdMax,
			getSetObjIdUsed: getSetObjIdUsed,
			fetchObjIdInfo: fetchObjIdInfo,
			craftRecTag: craftRecTag,
			getSetTagData: getSetTagData,
			onSdkItemParse: onSdkItemParse
		};
	}]);

})();
