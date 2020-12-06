(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_TAMPER
	app.controller('ObjTypeCtrl_Tamper', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
		];

		vm.objRecTrbl = [
			{ name: 'trblStatus',     label: 'Trouble status',  tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short bit.tamper : 1', desc: ''},
			{ name: 'timestampUTC',   label: 'Timestamp_UTC',   tagName: 'utc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',   desc: ''},
			{ name: 'timestampLocal', label: 'Timestamp local', tagName: 'loc_time3', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL', desc: ''}
		];

		vm.objEvt = [
			{ id: 0, desc: 'Tamper - Trouble new' },
			{ id: 1, desc: 'Tamper - Trouble restored' }
		];

		vm.objType = {
			name: 'Tamper',
			objTypeTag: 'tamper',
			desc: 'Object type Tamper',
			objTypeId: 45,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,  desc: 'Object configuration data' },
						{ name: 'trouble', label: 'Trouble', 	   recTag: 'trouble',  tblTags: vm.objRecTrbl, desc: 'Object trouble data' }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};


		$sdkObjTypeSvc.create(vm.objType);
	});

})();
