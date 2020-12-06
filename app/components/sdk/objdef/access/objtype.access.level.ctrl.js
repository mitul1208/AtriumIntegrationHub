(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_ACC_LEVEL
	app.controller('ObjTypeCtrl_AccLevel', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',    	tagName: 'obj_status',  numItem: 1,  size: 1,  disp: 'basic', c_code: 'char obj_status',                   desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',           	tagName: 'valid',       numItem: 1,  size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',        	tagName: 'ro',          numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted', 	tagName: 'protect',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Protected' },
			{ name: 'guid',            label: 'GUID',            	tagName: 'guid2',       numItem: 1,  size: 16, disp: 'adv',   c_code: 'char guid[16]',                     desc: 'Guid' },
			{ name: 'label',           label: 'Display name',       tagName: 'label3',      numItem: 1,  size: 64, disp: 'basic', c_code: 'char label[64]',                    desc: 'Label: Display name' },
			{ name: 'scheduleIndex',   label: 'Schedule index',   	tagName: 'word4',       numItem: 10, size: 2,  disp: 'basic', c_code: 'unsigned short schedule.index[10]', desc: 'Door schedule id (up to 10 doors per controller)' }
		];

		vm.objType = {
			name: 'Access level',
			objTypeTag: 'access_lvl',
			desc: 'Object type Access level',
			objTypeId: 24,
            disp: 'basic',
			group: 'Distributed',
			numObjIdDflt: 1000,
			objRecTbl: [{ name: 'config', label: 'Configuration',  recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
