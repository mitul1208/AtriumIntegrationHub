(function () {

	var app = angular.module('atControllers');

	app.factory('$sdkEvtSvc', ['$sdkObjTypeSvc',
		function ObjTypesServiceFactory($sdkObjTypeSvc) {
		"use strict";

		var evtList = [];

		function parseSdkEvtData(dataInfo, dataToParse){
			if ("ok" === dataToParse._res){
				// <EVT trans_id="14" cmd="read" res="ok" >
				// 	<DATA res="ok" sernum="0A221037" id="1" time="2016-11-18 16:20:24" time_utc="2016-11-18 21:20:24" obj_evt="0" obj_sn="0a229733" obj_type="34" obj_id="0" obj_label="" snd_obj_sn="ffffffff" snd_obj_type="-1" snd_obj_id="-1" snd_obj_label="" />
				// </EVT>
				if ((dataInfo._cmd === "read") ||
					(dataInfo._cmd === "query_read")){
					var evt = {
						serial: dataToParse._sernum,
						id: dataToParse._id,
						timeUtc: dataToParse._time_utc,
						timeLoc: dataToParse._time,
						objEvt: $sdkObjTypeSvc.objEvtGet(dataToParse._obj_type, dataToParse._obj_evt),
						objSerial: dataToParse._obj_sn,
						objType: $sdkObjTypeSvc.objTypeIdToName(dataToParse._obj_type),
						objId: dataToParse._obj_id,
						objLabel: dataToParse._obj_label,
						sendObjSerial: dataToParse._snd_obj_sn,
						sendObjType: $sdkObjTypeSvc.objTypeIdToName(dataToParse._snd_obj_type),
						sendObjId: dataToParse._snd_obj_id,
						sendObjLabel: dataToParse._snd_obj_label
					};
					create(evt);
				}
				// <EVT trans_id="15" cmd="query" res="ok" version="629760303" sernum_min="0A221037" sernum_max="0A221037" type_min="0" type_max="300" id_min="1" id_max="25000" last_ts_utc="-1" last_sernum="FFFFFFFF" last_num="-1" num_evt="30" num_evt_total="25000" client_tx="1" client_rx="1" >
				// 	<DATA res="ok" time_utc="1487015826" sernum="0A221037" id="752" />
				// </EVT>
				else if (dataInfo._cmd === "query"){
					var evtQry = {
						serial: dataToParse._sernum,
						id: dataToParse._id,
						timeUtc: dataToParse._time_utc
					};
					//todo: add to evt query list
				}
			}
		}
		var onSdkItemParse = function(elemTagName, ans, data) {
			if ((true == ans) &&
			    ("EVT" === elemTagName)){
				if ("ok" === data._res){
					if (undefined == data.DATA.length){
						parseSdkEvtData(data, data.DATA);
					}
					else{
						for (var i=0; i<data.DATA.length; i++){
							parseSdkEvtData(data, data.DATA[i]);
						}
					}
				}
			}
		}
		var all = function() {
			return evtList;
		}
		var empty = function(){
			evtList = [];
			return all();
		}
		var evtGet = function(serial, id){
			for (var i=0; i<evtList.length; i++){
				if ((evtList[i].serial == serial) &&
					(evtList[i].id == id)){
					return evtList[i];
				}
			}
			return null;
		}
		var getLastEvt = function(){
			var lastEvt = {
				lastTsStr: "-1",
				lastSernum: "FFFFFFFF",
				lastNum: "FFFFFFFF"
			};

			for (var i=0; i<evtList.length; i++){
				var update = true;
				if (lastEvt.lastTsStr > evtList[i].timeUtc){
					update = true;
				}
				else if (lastEvt.lastTsStr == evtList[i].timeUtc){
					if (lastEvt.lastSernum > evtList[i].serial){
						update = true;
					}
					else if (lastEvt.lastSernum == evtList[i].serial){
						if (lastEvt.lastNum > evtList[i].id){
							update = true;
						}
					}
				}

				if (true == update){
					lastEvt.lastTsStr  = evtList[i].timeUtc;
					lastEvt.lastSernum = evtList[i].serial;
					lastEvt.lastNum    = evtList[i].id;
				}
			}
			return lastEvt;
		}
		var create = function(evt) {
			if (null == evtGet(evt.serial, evt.id)){
				evtList.push(evt);
			}
			return all();
		}

		//Public Interface
		return {
			all: all,
			empty: empty,
			evtGet: evtGet,
			create: create,
			getLastEvt: getLastEvt,
			onSdkItemParse: onSdkItemParse
		};
	}]);

})();