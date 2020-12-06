(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_SDK
	app.controller('ObjTypeCtrl_AA_DoorHandle', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'addr',          label: 'Address',           tagName: 'byte3',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char aa_address',               desc: 'Address of this door on the RS485 bus' }
		];
		vm.objRecTrbl = [
			{ name: 'trblReaderTamper', label: 'Trouble - Reader tamper',    tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'char reader_tamper:1', 			desc: '' },
			{ name: 'trblBattLow',      label: 'Trouble - Battery low',      tagName: 'bit1',      numItem: 1, size: 1, disp: 'basic', c_code: 'char battery_low:1',       		desc: '' },
			{ name: 'trblBattCritical', label: 'Trouble - Battery critical', tagName: 'bit2',      numItem: 1, size: 1, disp: 'basic', c_code: 'char battery_critical:1',       desc: '' },
			{ name: 'trblRfLoss',       label: 'Trouble - RF Loss',          tagName: 'bit3',      numItem: 1, size: 1, disp: 'basic', c_code: 'char rf_loss:1',       			desc: '' },
			{ name: 'timestampUTC',     label: 'Timestamp UTC',       	     tagName: 'utc_time4', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',   desc: '' },
			{ name: 'timestampLocal',   label: 'Timestamp local',    		 tagName: 'loc_time5', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL', desc: '' }
		];
		vm.objRecStatus = [
			{ name: 'battVolt',     label: 'Battery voltage',    	   tagName: 'byte0', numItem: 1, size: 1, disp: 'adv',   c_code: 'char batt_volt', 		desc: '' },
			{ name: 'battVoltFrac', label: 'Battery voltage fraction', tagName: 'byte1', numItem: 1, size: 1, disp: 'adv',   c_code: 'char batt_volt_frac', desc: '' },
			{ name: 'online',       label: 'Online', 				   tagName: 'bit2',  numItem: 1, size: 1, disp: 'basic', c_code: 'char online:1',    	desc: '' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'AA door handle - Online' },
			{ id: 1, desc: 'AA door handle - Offline' }
		];

		vm.objType = {
			name: 'Assa-Abloy door handle',
			objTypeTag: 'aa_door_handle',
			desc: 'Object type Assa-Abloy door handle',
			objTypeId: 87,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 10,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble', label: 'Trouble', 	   recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',  label: 'Status', 	   recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' }],
			objCmdTbl: [{ name: 'scan',    label: 'Scan', 	   	   recTag: 'scan',     tblTags: null,               desc: 'Scan for new doors' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
