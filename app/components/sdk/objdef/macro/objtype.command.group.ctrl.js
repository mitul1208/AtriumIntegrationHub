(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MACRO
	app.controller('ObjTypeCtrl_CommandGroup', ["$sdkObjTypeSvc", function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',         label: 'Object status',                       tagName: 'obj_status', numItem: 1,   size: 1,   disp: 'basic', c_code: 'char obj_status',                       desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',             label: 'Valid',                               tagName: 'valid',      numItem: 1,   size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',         desc: 'Entity Flag: Active' },
			{ name: 'readOnly',          label: 'Read only',                           tagName: 'ro',         numItem: 1,   size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',         desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',     label: 'Cannot be deleted',                   tagName: 'protect',    numItem: 1,   size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',         desc: 'Entity Flag: Protected' },
            { name: 'label',             label: 'Display name',                        tagName: 'label2',     numItem: 1,   size: 64,  disp: 'basic', c_code: 'char label[64]',                        desc: 'Label: Display name' },
            { name: 'objType',           label: 'Object type',                         tagName: 'word3',      numItem: 1,   size: 2,   disp: 'basic', c_code: 'unsigned short obj_type',               desc: 'Object id list type' },
			{ name: 'objIdListSerial',   label: 'Object id list - Serial',             tagName: 'serial4',    numItem: 100, size: 4,   disp: 'basic', c_code: 'macro_group_obj_id_st obj_id[].serial', desc: 'Object id list - serial' },
			{ name: 'objIdListId',       label: 'Object id list - Id',                 tagName: 'word5',      numItem: 100, size: 2,   disp: 'basic', c_code: 'macro_group_obj_id_st obj_id[].id',     desc: 'Object id list - id' },
        ];

		vm.objEvt = [
			{ id: 0, desc: 'Macro Group - Macro group executed' }
		];

		vm.objType = {
			name: 'Command Group',
			objTypeTag: 'cmd_gr',
			desc: 'Object type Command Group',
			objTypeId: 201,
            disp: 'adv',      // 'advanced'
			group: 'Local',
			numObjIdDflt: 256,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg', tblTags: vm.objRecCfg }],
            objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	}]);

})();
