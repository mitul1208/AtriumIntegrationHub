(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_ACC_TEMPLATE
	app.controller('ObjTypeCtrl_AccLevelTmpl', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object Status',    	tagName: 'obj_status', numItem: 1,  size: 1,  disp: 'basic', c_code: 'char obj_status',                   desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',           	tagName: 'valid',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',        	tagName: 'ro',         numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',  tagName: 'protect',    numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Protected' },
			{ name: 'guid',            label: 'GUID',            	tagName: 'guid2',      numItem: 1,  size: 16, disp: 'adv',   c_code: 'char guid[16]',                     desc: 'Guid' },
			{ name: 'label',           label: 'Display name',      	tagName: 'label3',     numItem: 1,  size: 64, disp: 'basic', c_code: 'char label[64]',                    desc: 'Label: Display name' },
			{ name: 'accessLevelList', label: 'Access Level List', 	tagName: 'word4',      numItem: 25, size: 2,  disp: 'basic', c_code: 'unsigned short acc_level_list[25]', desc: 'Access level template: 0=none; 1=always; 2=programming; 65535=free' }
		];

		vm.objType = {
            name: 'Access level template',
            objTypeTag: 'access_tmpl',
            desc: 'Object type Access Level Template',
            objTypeId: 120,
            disp: 'basic',
			group: 'Distributed',
            numObjIdDflt: 100,
            objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
            objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
            };

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
