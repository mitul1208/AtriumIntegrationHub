(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_LICENSE
	app.controller('ObjTypeCtrl_PnpSlave', ["$sdkObjTypeSvc", function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
            { name: 'objStatus',      label: 'Object status',         tagName: 'obj_status', numItem: 1, size: 1,    disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',          label: 'Valid',                 tagName: 'valid',      numItem: 1, size: 1,    disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',       label: 'Read only',             tagName: 'ro',         numItem: 1, size: 1,    disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
            { name: 'cantBeDeleted',  label: 'Cannot be deleted',     tagName: 'protect',    numItem: 1, size: 1,    disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'objType',        label: 'Object Type',           tagName: 'obj_type2',  numItem: 1, size: 2,    disp: 'basic', c_code: 'unsigned short obj_type',       desc: 'Object Type' },
            { name: 'objRecord',      label: 'Object Record',         tagName: 'byte3',      numItem: 1, size: 1,    disp: 'basic', c_code: 'unsigned char obj_record',      desc: 'Object Record' },
            { name: 'objSize',        label: 'Object Data Size',      tagName: 'word4',      numItem: 1, size: 2,    disp: 'basic', c_code: 'unsigned short obj_size',       desc: 'Object Data Size' },
            { name: 'objData',        label: 'Object Data',           tagName: 'hexa5',      numItem: 1, size: 1000, disp: 'basic', c_code: 'unsigned char data[1000]',      desc: 'Object Data' }
		];

		vm.objType = {
			name: 'PNP Slave',
			objTypeTag: 'pnp_slave',
			desc: 'Object type PNP Slave',
			objTypeId: 36,
            disp: 'adv',      // 'advanced'
			group: 'Local',
			numObjIdDflt: 2,
			objRecTbl: [{ name: 'config',       label: 'Configuration',  recTag: 'cfg',      tblTags: vm.objRecCfg, desc: 'Object configuration data' }],
			objCmdTbl: [{ name: 'set',          label: 'Set',            recTag: 'set',      tblTags: null,         desc: 'Command Set PNP slave'     }],
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	}]);

})();
