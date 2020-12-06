(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_FLOOR_LEVEL
	app.controller('ObjTypeCtrl_FloorLevel', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',      label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',          label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',       label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',  label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',          label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'guid',           label: 'GUID',              tagName: 'guid3',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char guid[16]',                 desc: 'Guid' },
			{ name: 'schedId',        label: 'Schedule Id',       tagName: 'word4',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short schedule_id',    desc: 'Schedule (65535 = None)' },
			{ name: 'floorException', label: 'Floor exceptions',  tagName: 'bit_field5', numItem: 1, size: 32, disp: 'basic', c_code: 'char floor_bitfield[32]',       desc: 'Floor exception bits: (max 256 exceptions)' }
		];

		vm.objType = {
			name: 'Floor level',
			objTypeTag: 'floor_lvl',
			desc: 'Object type Floor level',
			objTypeId: 84,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 256,
			objRecTbl: [{ name: 'config', label: 'Configuration',   recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
