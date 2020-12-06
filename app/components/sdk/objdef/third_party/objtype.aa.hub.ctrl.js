(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_SDK
	app.controller('ObjTypeCtrl_AA_Hub', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'addr',          label: 'Address',           tagName: 'byte3',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char aa_address',               desc: 'Address on the RS485 bus' }
		];
		vm.objRecTrbl = [
			{ name: 'trblTamper',     label: 'Trouble - Tamper', tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'char tamper:1', 			    desc: '' },
			{ name: 'timestampUTC',   label: 'Timestamp UTC',    tagName: 'utc_time1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',   desc: '' },
			{ name: 'timestampLocal', label: 'Timestamp local',  tagName: 'loc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL', desc: '' }
		];
		vm.objRecStatus = [
			{ name: 'online',       label: 'Online', 				   tagName: 'bit0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char online:1',    	desc: '' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'AA hub - Online' },
			{ id: 1, desc: 'AA hub - Offline' },
			{ id: 2, desc: 'AA hub - Tamper trouble new' },
			{ id: 3, desc: 'AA hub - Tamper trouble restored' }
		];

		vm.objType = {
			name: 'Assa-Abloy hub',
			objTypeTag: 'aa_hub',
			desc: 'Object type Assa-Abloy hub',
			objTypeId: 86,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 10,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble', label: 'Trouble', 	   recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',  label: 'Status', 	   recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' }],
			objCmdTbl: [{ name: 'delete',  label: 'Delete', 	   recTag: 'delete',   tblTags: null,               desc: 'Delete' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
