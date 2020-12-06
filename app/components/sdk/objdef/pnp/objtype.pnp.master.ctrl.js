(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_LICENSE
	app.controller('ObjTypeCtrl_PnpMaster', ["$sdkObjTypeSvc", function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
            { name: 'objStatus',      label: 'Object status',         tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
            { name: 'valid',          label: 'Valid',                 tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',       label: 'Read only',             tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',  label: 'Cannot be deleted',     tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'serial',         label: 'Device serial number',  tagName: 'serial2',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long serial',          desc: 'Device serial number' },
            { name: 'timestamp',      label: 'Timestamp',             tagName: 'dword3',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long timestamp',       desc: 'Timestamp' },
            { name: 'lastId',         label: 'Last id',               tagName: 'dword4',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned long last_id',         desc: 'Last id' }
		];

		vm.objType = {
			name: 'PNP Master',
			objTypeTag: 'pnp_master',
			desc: 'Object type PNP Master',
			objTypeId: 35,
            disp: 'adv',      // 'advanced'
			group: 'Local',
			numObjIdDflt: 100,
			objRecTbl: [{ name: 'config',       label: 'Configuration',  recTag: 'cfg',      tblTags: vm.objRecCfg, desc: 'Object configuration data'  }],
			objCmdTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	}]);

})();
