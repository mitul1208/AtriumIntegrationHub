(function () {

	var app = angular.module('atControllers');

	app.factory('$sdkObjTypeSvc', function () {
		"use strict";

		var objTypes = [];
		var orphanEvt = [
			{ objTypeId: 65535, objTypeTag: '*',            id: 230, desc: 'Label change new' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 231, desc: 'Label change old' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 240, desc: 'Refresh configuration' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 241, desc: 'Refresh status' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 250, desc: 'Record add' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 251, desc: 'Record write' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 252, desc: 'Record delete' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 253, desc: 'Record init' },
			{ objTypeId: 65535, objTypeTag: '*',            id: 254, desc: 'Record reset' },
			{ objTypeId: 47,    objTypeTag: 'pull_station', id: 0,   desc: 'Pull station - Emergency' },
			{ objTypeId: 47,    objTypeTag: 'pull_station', id: 1,   desc: 'Pull station - Normal' },
			{ objTypeId: 75,    objTypeTag: 'ca_cert',      id: 0,   desc: 'CA certificate - DNS error' },
			{ objTypeId: 25,    objTypeTag: 'firmware',     id: 0,   desc: 'Firmware - Validation finished' },
			{ objTypeId: 25,    objTypeTag: 'firmware',     id: 1,   desc: 'Firmware - Update started' },
			{ objTypeId: 25,    objTypeTag: 'firmware',     id: 2,   desc: 'Firmware - From auto-update' },
			{ objTypeId: 25,    objTypeTag: 'firmware',     id: 3,   desc: 'Firmware - Update started - external FS' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 0,   desc: 'Bell - Off' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 1,   desc: 'Bell - On' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 2,   desc: 'Bell - Trouble new' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 3,   desc: 'Bell - Trouble restored' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 4,   desc: 'Bell - Absent short' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 5,   desc: 'Bell - Absent open' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 6,   desc: 'Bell - Absent short restored' },
			{ objTypeId: 3,     objTypeTag: 'bell',         id: 7,   desc: 'Bell - Absent open restored' },
			{ objTypeId: 32,    objTypeTag: 'output_pwm',   id: 0,   desc: 'Output PWM - Latch off' },
			{ objTypeId: 32,    objTypeTag: 'output_pwm',   id: 1,   desc: 'Output PWM - Latch on' },
			{ objTypeId: 32,    objTypeTag: 'output_pwm',   id: 2,   desc: 'Output PWM - Latch flash' },
			{ objTypeId: 35,    objTypeTag: 'pnp_master',   id: 0,   desc: 'PNP master - Refresh' },
			{ objTypeId: 35,    objTypeTag: 'pnp_master',   id: 1,   desc: 'PNP master - Overload' },
			{ objTypeId: 35,    objTypeTag: 'pnp_master',   id: 2,   desc: 'PNP master - Overload restored' },
			{ objTypeId: 36,    objTypeTag: 'pnp_slave',    id: 0,   desc: 'PNP slave - Refresh' },
			{ objTypeId: 36,    objTypeTag: 'pnp_slave',    id: 1,   desc: 'PNP slave - Overload' },
			{ objTypeId: 36,    objTypeTag: 'pnp_slave',    id: 2,   desc: 'PNP slave - Overload restored' },
			{ objTypeId: 61,    objTypeTag: 'sync',         id: 0,   desc: 'Sync - Refresh' },
			{ objTypeId: 61,    objTypeTag: 'sync',         id: 1,   desc: 'Sync - Overload' },
			{ objTypeId: 61,    objTypeTag: 'sync',         id: 2,   desc: 'Sync - Overload restored' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 0,   desc: 'Zone - Open' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 1,   desc: 'Zone - Close' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 2,   desc: 'Zone - Short' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 3,   desc: 'Zone - Cut' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 4,   desc: 'Zone - Mask' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 8,   desc: 'Zone - Disabled by command' },
			{ objTypeId: 6,     objTypeTag: 'zone',         id: 9,   desc: 'Zone - Enabled by command' },
			{ objTypeId: 29,    objTypeTag: 'smoke',        id: 0,   desc: 'Smoke - Fire loop trouble' },
			{ objTypeId: 29,    objTypeTag: 'smoke',        id: 1,   desc: 'Smoke - OK' },
			{ objTypeId: 29,    objTypeTag: 'smoke',        id: 2,   desc: 'Smoke - Alarm' },
			{ objTypeId: 29,    objTypeTag: 'smoke',        id: 3,   desc: 'Smoke - Unknown' }
		];

		var objRecInfo = [
			{ name: 'recSize', label: 'Record size',    tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long record_size',   desc: 'Size of the record type' },
			{ name: 'recUsed', label: 'Record used',    tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long record_used',   desc: 'Number of object id used (last used)' },
			{ name: 'recMax',  label: 'Record max',     tagName: 'dword2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long record_max',    desc: 'Number of object id supported' },
			{ name: 'recOpt',  label: 'Record options', tagName: 'dword3', numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long record_option', desc: 'Record options' },
		];
		var objRecTblInfo = { name: 'info', label: 'Record info',  recTag: 'info', tblTags: objRecInfo, desc: 'Record info' };

		var all = function () {
			// console.debug(objTypes);
			return objTypes;
		}
		var create = function (objType) {
			if (objType.objRecTbl == null){
				objType.objRecTbl = [];
			}
			// objType.objRecTbl.push(objRecTblInfo);
			objTypes.push(objType);
			// console.debug('object type create: ', objType.name);
			return this.all();
		}

		var get = function (id) {
			if (id < 0 || id > (objTypes.length - 1)) {
				return null;
			}
			return objTypes[id];
		}
		var objTypeByIdGet = function (id) {
			for (var i = 0; i < objTypes.length; i++) {
				if (id == objTypes[i].objTypeId) {
					return objTypes[i];
				}
			}
			return null;
		}
		var objTypeIdToName = function (id) {
			var objType = objTypeByIdGet(id);
			if (null != objType){
				return objType.name;
			}
			return null;
		}
        var getByObjTypeTag = function (objTypeTag) {
            for (var i = 0; i < objTypes.length; i++) {
                if (objTypeTag == objTypes[i].objTypeTag) {
                    return objTypes[i];
				}
            }
            return null;
        }
		var getNumObjIdDflt = function (objTypeTag){
			var objType = getByObjTypeTag(objTypeTag);
			if (null != objType){
				return objType.numObjIdDflt;
			}
			return 0;
		}
		var objEvtGet = function (objTypeId, objEvtId){
            var i;
			var objType = objTypeByIdGet(objTypeId);
			if (null != objType){
				if (null != objType.objEvtTbl){
					for (i = 0; i < objType.objEvtTbl.length; i++) {
						if (objEvtId == objType.objEvtTbl[i].id) {
							return objType.objEvtTbl[i].desc;
						}
					}
				}
			}
            for (i=0; i<orphanEvt.length; i++){
                if ((objTypeId == orphanEvt[i].objTypeId) ||
                    (65535 == orphanEvt[i].objTypeId)) {
                    if (objEvtId == orphanEvt[i].id) {
                        return orphanEvt[i].desc;
                    }
                }
            }
			return null;
		}
		var getRecTbl = function (objType, recTag) {
			if (null != objType) {
				if (null != objType.objRecTbl){
					for (var i = 0; i < objType.objRecTbl.length; i++) {
						if (recTag == objType.objRecTbl[i].recTag) {
							return objType.objRecTbl[i];
						}
					}
				}
			}
			return null;
		}
		var getCmdTbl = function (objType, cmdTag) {
			if (null != objType) {
				if (null != objType.objCmdTbl){
					for (var i = 0; i < objType.objCmdTbl.length; i++) {
						if (cmdTag == objType.objCmdTbl[i].recTag) {
							return objType.objCmdTbl[i];
						}
					}
				}
			}
			return null;
		}
		var getTagName = function (objTypeTag, recTag, tagName) {
			var objType = getByObjTypeTag(objTypeTag);
			var recTbl = getRecTbl(objType, recTag);
			if (null === recTbl){
				recTbl = getCmdTbl(objType, recTag);
			}
			if (null != recTbl){
				if (null != recTbl.tblTags){
					for (var i = 0; i < recTbl.tblTags.length; i++) {
						if (tagName == recTbl.tblTags[i].tagName) {
							return recTbl.tblTags[i];
						}
					}
				}
			}
			return null;
		}
		var getObjRecTblInfo = function(){
			return objRecTblInfo;
		}

		var numRecGet = function(objType){
			if (null != objType){
				if (null != objType.objRecTbl){
					return objType.objRecTbl.length;
				}
			}
			return 0;
		}
		var numCmdGet = function(objType){
			if (null != objType){
				if (null != objType.objCmdTbl){
					return objType.objCmdTbl.length;
				}
			}
			return 0;
		}
		var numEvtGet = function(objType){
			if (null != objType){
				if (null != objType.objEvtTbl){
					return objType.objEvtTbl.length;
				}
			}
			return 0;
		}

		//Public Interface
		return {
			all: all,
			create: create,
			get: get,
			objTypeByIdGet: objTypeByIdGet,
			objTypeIdToName: objTypeIdToName,
			objEvtGet: objEvtGet,
			getByObjTypeTag: getByObjTypeTag,
			getNumObjIdDflt: getNumObjIdDflt,
			getRecTbl: getRecTbl,
			getTagName: getTagName,
			getCmdTbl: getCmdTbl,
			getObjRecTblInfo: getObjRecTblInfo,
			numRecGet: numRecGet,
			numCmdGet: numCmdGet,
			numEvtGet: numEvtGet
		};
	});

})();