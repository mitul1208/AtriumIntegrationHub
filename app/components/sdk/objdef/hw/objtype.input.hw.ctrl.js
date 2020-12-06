(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_INPUT_HARDWARE
	app.controller('ObjTypeCtrl_InputHw', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',       tagName: 'obj_status', numItem: 1, size: 1, disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',               tagName: 'valid',      numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',           tagName: 'ro',         numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted',   tagName: 'protect',    numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'inputHwMode',   label: 'Input hardware mode', tagName: 'byte1',      numItem: 1, size: 1, disp: 'basic', c_code: 'char type',                     desc: 'input hard mode: 0=single0; 1=single1; 2=single2; 3=single3; 4=double0; 5=double5; 6=mask0; 7=mask1' },
		];

		vm.objRecPriv = [
			{ name: 'inputType', label: 'Input Type', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'char type', desc: '' },
		];

		vm.objType = {
			name: 'Input Hardware',
			objTypeTag: 'input_hw',
			desc: 'Object type Input Hardware',
			objTypeId: 21,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 6,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'private', label: 'Private',       recTag: 'private',  tblTags: vm.objRecPriv,      desc: 'Object private data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
