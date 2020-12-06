(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_FLOOR
	app.controller('ObjTypeCtrl_EbusMdl', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;


		vm.objRecCfg = [
			{ name: 'objStatus',                label: 'Object status',                tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                     desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                    label: 'Valid',                        tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Active' },
			{ name: 'readOnly',                 label: 'Read only',                    tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',            label: 'Cannot be deleted',            tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Protected' },
			{ name: 'label',                    label: 'Display name',                 tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                      desc: 'Label: Display name' },
			{ name: 'busAddr',                  label: 'Bus Address',                  tagName: 'byte3',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char bus_address',                    desc: 'Address of this door on the RS485 bus [1 to 64]' }
        ];

		vm.objRecTrbl = [
			{ name: 'optTamperAlarm',   label: 'Option tamper in alarm',       tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char tamper_in_alarm:1',         desc: '' },
            { name: 'optPowerAlarm',    label: 'Option power alarm',           tagName: 'bit1',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char power_alarm:1',             desc: '' },
            { name: 'optLowBatt',       label: 'Option low battery',           tagName: 'bit2',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char low_battery:1',             desc: '' },
            { name: 'optRelayVoltFail', label: 'Option relay voltage failure', tagName: 'bit3',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char relay_voltage_failure:1',   desc: '' },
			{ name: 'timestampUTC',     label: 'Timestamp UTC',                tagName: 'utc_time4', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',             desc: '' },
			{ name: 'timestampLocal',   label: 'Timestamp local',              tagName: 'loc_time5', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL',           desc: '' }
		];

        vm.objRecStatus = [
            { name: 'battVolt',     label: 'Battery Voltage',       tagName: 'byte0',   numItem: 1, size: 1, disp: 'basic', c_code: 'char batt_volt',           desc: '' },
            { name: 'battVoltFrac', label: 'Battery Voltage Frac',  tagName: 'byte1',   numItem: 1, size: 1, disp: 'basic', c_code: 'char batt_volt_frac',      desc: '' },
			{ name: 'online',       label: 'Online',                tagName: 'bit2',    numItem: 1, size: 1, disp: 'adv',   c_code: 'char online :1',           desc: '' },
			{ name: 'drmModeEn',    label: 'DRM mode enable',       tagName: 'bit3',    numItem: 1, size: 1, disp: 'adv',   c_code: 'char drm_mode_enable:1',   desc: '' }
        ];

		vm.objEvt = [
			{ id: 0, desc: 'EBus Module - Online' },
			{ id: 1, desc: 'EBus Module - Offline' },
            { id: 2, desc: 'EBus Module - Tamper trouble' },
            { id: 3, desc: 'EBus Module - Tamper restore' },
            { id: 4, desc: 'EBus Module - Low battery trouble' },
            { id: 5, desc: 'EBus Module - Low battery restore' },
            { id: 6, desc: 'EBus Module - Relay voltage trouble' },
            { id: 7, desc: 'EBus Module - Relay voltage restore' },
            { id: 8, desc: 'EBus Module - Power trouble' },
            { id: 9, desc: 'EBus Module - Power restore' },
            { id: 10, desc: 'EBus Module - DRM Enable' },
            { id: 11, desc: 'EBus Module - DRM Disable' },
		];

		vm.objType = {
			name: 'EBus Module',
			objTypeTag: 'ebus_mdl',
			desc: 'Object type EBus Module',
			objTypeId: 83,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 8,
			objRecTbl: [{ name: 'config',   label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble',  label: 'Trouble', 	    recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',   label: 'Status', 		recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' }],
			objCmdTbl: [{ name: 'scan',     label: 'Scan',          recTag: 'scan',     tblTags: null,               desc: 'Scan' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
