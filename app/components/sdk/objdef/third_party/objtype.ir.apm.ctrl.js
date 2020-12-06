(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_SDK
	app.controller('ObjTypeCtrl_IR_Apm', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' }
		];
		vm.objRecTrbl = [
			{ name: 'trblReaderTamper', label: 'Trouble - Reader tamper',    		 tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'char reader_tamper:1', 			desc: '' },
			{ name: 'trblBattLow',      label: 'Trouble - Battery low',      		 tagName: 'bit1',      numItem: 1, size: 1, disp: 'basic', c_code: 'char battery_low:1',       		desc: '' },
			{ name: 'trblBattCritical', label: 'Trouble - Battery critical', 		 tagName: 'bit2',      numItem: 1, size: 1, disp: 'basic', c_code: 'char battery_critical:1',       desc: '' },
			{ name: 'trblLithBattLow',  label: 'Trouble - Lithium Battery low',      tagName: 'bit3',      numItem: 1, size: 1, disp: 'adv',   c_code: 'char lbattery_low:1',       	desc: '' },
			{ name: 'trblLithBattCrit', label: 'Trouble - Lithium Battery critical', tagName: 'bit4',      numItem: 1, size: 1, disp: 'adv',   c_code: 'char lbattery_critical:1',      desc: '' },
			{ name: 'trblRfLoss',       label: 'Trouble - RF Loss',          	     tagName: 'bit5',      numItem: 1, size: 1, disp: 'basic', c_code: 'char rf_loss:1',       			desc: '' },
			{ name: 'trblPimTamper',    label: 'Trouble - PIM tamper',               tagName: 'bit6',      numItem: 1, size: 1, disp: 'basic', c_code: 'char pim_tamper:1',       		desc: '' },
			{ name: 'timestampUTC',     label: 'Timestamp UTC',       	     		 tagName: 'utc_time7', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',   desc: '' },
			{ name: 'timestampLocal',   label: 'Timestamp local',    		 		 tagName: 'loc_time8', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL', desc: '' }
		];
		vm.objRecStatus = [
			{ name: 'battVolt',     	label: 'Battery voltage',    	   		   tagName: 'byte0', numItem: 1, size: 1, disp: 'adv',   c_code: 'char batt_volt', 		      desc: '' },
			{ name: 'battVoltFrac', 	label: 'Battery voltage fraction', 		   tagName: 'byte1', numItem: 1, size: 1, disp: 'adv',   c_code: 'char batt_volt_frac',       desc: '' },
			{ name: 'lithBattVolt',     label: 'Lithium Battery voltage',    	   tagName: 'byte2', numItem: 1, size: 1, disp: 'adv',   c_code: 'char batt_volt', 		      desc: '' },
			{ name: 'lithBattVoltFrac', label: 'Lithium Battery voltage fraction', tagName: 'byte3', numItem: 1, size: 1, disp: 'adv',   c_code: 'char batt_volt_frac',       desc: '' },
			{ name: 'cfgMode',          label: 'Configuration mode', 			   tagName: 'bit4',  numItem: 1, size: 1, disp: 'basic', c_code: 'char configuration_mode:1', desc: '' },
			{ name: 'online',           label: 'Online', 				   		   tagName: 'bit5',  numItem: 1, size: 1, disp: 'basic', c_code: 'char online:1',    		  desc: '' },
			{ name: 'linkMode',         label: 'Link mode', 				   	   tagName: 'bit6',  numItem: 1, size: 1, disp: 'basic', c_code: 'char link_mode:1',    	  desc: '' }
		];

		vm.objEvt = [
			{ id: 0,  desc: 'IR APM - Reader trouble new' },
			{ id: 1,  desc: 'IR APM - Reader trouble restored' },
			{ id: 2,  desc: 'IR APM - Battery low trouble new' },
			{ id: 3,  desc: 'IR APM - Battery low trouble restored' },
			{ id: 4,  desc: 'IR APM - Battery critical trouble new' },
			{ id: 5,  desc: 'IR APM - Battery critical trouble restored' },
			{ id: 6,  desc: 'IR APM - Lithium battery low trouble new' },
			{ id: 7,  desc: 'IR APM - Lithium battery low trouble restored' },
			{ id: 8,  desc: 'IR APM - Lithium battery critical trouble new' },
			{ id: 9,  desc: 'IR APM - Lithium battery critical trouble restored' },
			{ id: 10, desc: 'IR APM - RF lost trouble new' },
			{ id: 11, desc: 'IR APM - RF lost trouble restored' },
			{ id: 12, desc: 'IR APM - PIM tamper trouble new' },
			{ id: 13, desc: 'IR APM - PIM tamper trouble restored' },
			{ id: 14, desc: 'IR APM - Link mode enabled' },
			{ id: 15, desc: 'IR APM - Link mode disabled' },
			{ id: 16, desc: 'IR APM - Online' },
			{ id: 17, desc: 'IR APM - Offline' }
		];

		vm.objType = {
			name: 'Schlage APM',
			objTypeTag: 'ir_apm',
			desc: 'Object type Schlage APM',
			objTypeId: 66,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 10,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble', label: 'Trouble', 	   recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',  label: 'Status', 	   recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' }],
			objCmdTbl: [{ name: 'delete',  label: 'Delete', 	   recTag: 'delete',   tblTags: null,               desc: 'Delete' },
						{ name: 'linkOn',  label: 'Link ON', 	   recTag: 'link_on',  tblTags: null,               desc: 'Link ON' },
						{ name: 'linkOff', label: 'Link OFF', 	   recTag: 'link_off', tblTags: null,               desc: 'Link OFF' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
