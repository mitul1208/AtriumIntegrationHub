(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_SDK
	app.controller('ObjTypeCtrl_IR_Pim', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'apmRangeLow',   label: 'APM range low',     tagName: 'byte3',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char apm_range_low',            desc: '' },
			{ name: 'apmRangeHigh',  label: 'APM range high',    tagName: 'byte4',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char apm_range_high',           desc: '' }
		];
		vm.objRecTrbl = [
			{ name: 'trblTamper',     label: 'Trouble - Tamper', tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'char tamper:1', 				desc: '' },
			{ name: 'timestampUTC',   label: 'Timestamp UTC',    tagName: 'utc_time1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',   desc: '' },
			{ name: 'timestampLocal', label: 'Timestamp local',  tagName: 'loc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL', desc: '' }
		];
		vm.objRecStatus = [
			{ name: 'online', label: 'Online', tagName: 'bit0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char online:1',    	desc: '' }
		];
		vm.objRecStatusExt = [
			{ name: 'linkModeEn',    label: 'Link mode - Enable', tagName: 'byte0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char link_mode_enable',    	desc: '' },
			{ name: 'linkModeApmId', label: 'Link mode - APM id', tagName: 'byte1',  numItem: 1, size: 1, disp: 'basic', c_code: 'char link_mode_apm_id',    	desc: '' }
		];

		vm.objCmdModify = [
			{ name: 'apmLow',  label: 'APM low',  tagName: 'byte0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char apm_low',    	desc: '' },
			{ name: 'apmHigh', label: 'APM high', tagName: 'byte1',  numItem: 1, size: 1, disp: 'basic', c_code: 'char apm_high',    	desc: '' }
		];
		vm.objCmdLinkMode = [
			{ name: 'apmId', label: 'APM id', tagName: 'byte0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char apm_id',    	desc: '' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'IR PIM - Tamper trouble new' },
			{ id: 1, desc: 'IR PIM - Tamper trouble restored' },
			{ id: 2, desc: 'IR PIM - Online' },
			{ id: 3, desc: 'IR PIM - Offline' },
			{ id: 4, desc: 'IR PIM - Link mode enabled' },
			{ id: 5, desc: 'IR PIM - Link mode disabled' }
		];

		vm.objType = {
			name: 'Schlage PIM',
			objTypeTag: 'ir_pim',
			desc: 'Object type Schlage PIM',
			objTypeId: 65,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 10,
			objRecTbl: [{ name: 'config',    label: 'Configuration',   recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble',   label: 'Trouble', 	       recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',    label: 'Status', 	       recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' },
						{ name: 'statusExt', label: 'Status extended', recTag: 'status2',  tblTags: vm.objRecStatusExt, desc: 'Object extended status data' }],
			objCmdTbl: [{ name: 'delete',    label: 'Delete', 	       recTag: 'delete',   tblTags: null,               desc: 'Delete' },
						{ name: 'modify',    label: 'Modify',          recTag: 'modify',   tblTags: vm.objCmdModify,    desc: 'Modify' },
						{ name: 'linkOn',    label: 'Link ON', 	       recTag: 'link_on',  tblTags: vm.objCmdLinkMode,  desc: 'Link mode ON' },
						{ name: 'linkOff',   label: 'Link OFF', 	   recTag: 'link_off', tblTags: vm.objCmdLinkMode,  desc: 'Link mode OFF' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
