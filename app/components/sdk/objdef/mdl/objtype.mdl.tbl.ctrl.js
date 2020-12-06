(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MODULE_TABLE
	app.controller('ObjTypeCtrl_MdlTbl', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',    label: 'Object status',  tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',       desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'serial',       label: 'Serial number',  tagName: 'serial1',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long serial',  desc: 'Serial number of the module' },
			{ name: 'productCode',  label: 'Product code',   tagName: 'utf2',       numItem: 1, size: 32, disp: 'basic', c_code: 'char product_code[32]', desc: 'Product code of the module' },
			{ name: 'productFam',   label: 'Product family', tagName: 'hexa3',      numItem: 1, size: 2,  disp: 'basic', c_code: 'short product_family',  desc: 'Product family of the module: 0x0001=Atrium' },
			{ name: 'productId',    label: 'Product id',     tagName: 'hexa4',      numItem: 1, size: 2,  disp: 'basic', c_code: 'short product_id',      desc: 'Product id of the module: 0x0011=AC22; 0x0015=IO expander; 0x001A=ADH10 schlage; 0x001B=A22; 0x001C=ADH10 assa-abloy' }
		];

		vm.objRecStatus = [
			{ name: 'online',  label: 'Online status',  tagName: 'bit0', numItem: 1, size: 1, disp: 'basic', c_code: 'char online:1',  desc: 'Module status - Online' },
			{ name: 'trouble', label: 'Trouble status', tagName: 'bit1', numItem: 1, size: 1, disp: 'basic', c_code: 'char trouble:1', desc: 'Module status - Trouble' }
		];

        vm.objRecStatus2 = [
			{ name: 'appName',   label: 'Application name',   tagName: 'utf0',   numItem: 1, size: 64, disp: 'basic', c_code: 'char application_name[64]',         desc: 'Module status - application name' },
            { name: 'supported', label: 'Supported features', tagName: 'hexv1',  numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short supported_features', desc: 'Module status - Supported features' },
            { name: 'fwVers',    label: 'Firmware version',   tagName: 'byte2',  numItem: 1, size: 1,  disp: 'basic', c_code: 'char firmware_version',             desc: 'Module status - Firmware version' },
            { name: 'fwRev',     label: 'Firmware revision',  tagName: 'byte3',  numItem: 1, size: 1,  disp: 'basic', c_code: 'char firmware_revision',            desc: 'Module status - Firmware revision' },
            { name: 'fwBuild',   label: 'Firmware build',     tagName: 'dword4', numItem: 1, size: 4,  disp: 'basic', c_code: 'long firmware_build',               desc: 'Module status - Firmware build' }
        ];

        vm.objRecStatusSync = [
			{ name: 'syncCnt',  label: 'Global sync counter',  tagName: 'dword0', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned long GlobalSyncCnt',  desc: 'Global sync counter' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'Module table - Module detected' },
			{ id: 1, desc: 'Module table - Module missing' },
            { id: 2, desc: 'Module table - Module missing restored' },
            { id: 3, desc: 'Module table - Global sync counter update' },
		];

		vm.objType = {
			name: 'Module table',
			objTypeTag: 'mdl_tbl',
			desc: 'Object type Module table',
			objTypeId: 5,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 200,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,        desc: 'Object configuration data' },
                        { name: 'status',  label: 'Status', 	   recTag: 'status',   tblTags: vm.objRecStatus,     desc: 'Object status data' },
                        { name: 'status2', label: 'Status 2', 	   recTag: 'status2',  tblTags: vm.objRecStatus2,    desc: 'Object status 2 data' },
                        { name: 'sync',    label: 'Status Sync',   recTag: 'sync',     tblTags: vm.objRecStatusSync, desc: 'Object status sync data' }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
