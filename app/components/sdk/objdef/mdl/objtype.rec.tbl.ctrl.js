(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_REC_TABLE
	app.controller('ObjTypeCtrl_RecTbl', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objType',    label: 'Object type',         tagName: 'obj_type0', numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short obj_type',      desc: ''},
			{ name: 'objRecCnd',  label: 'Object record count', tagName: 'word1',     numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short obj_rec_count', desc: ''},
			{ name: 'objIdMax',   label: 'Object id max',       tagName: 'dword2',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long obj_idx_max',    desc: ''},
			{ name: 'objIdUsed',  label: 'Object id used',      tagName: 'dword3',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long obj_idx_used',   desc: ''},
			{ name: 'objSyncCnt', label: 'Object sync count',   tagName: 'dword4',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long obj_sync_count', desc: ''}
		];

		vm.objRecInfoExt = [
			{ name: 'label',           label: 'Display name',            tagName: 'utf0',   numItem: 1, size: 64, disp: 'basic', c_code: 'char product_name[64]',                  desc: 'Product Name (ex Controller Access)' },
			{ name: 'productCode',     label: 'Product code',            tagName: 'utf1',   numItem: 1, size: 32, disp: 'basic', c_code: 'char product_code[32]',                  desc: 'Product Code (ex CTV900)' },
			{ name: 'productFam',      label: 'Product family',          tagName: 'word2',  numItem: 1, size: 2,  disp: 'basic', c_code: 'short product_family',                   desc: '' },
			{ name: 'productId',       label: 'Product id',              tagName: 'word3',  numItem: 1, size: 2,  disp: 'basic', c_code: 'short product_id',                       desc: '' },
			{ name: 'fwVersion',       label: 'Firmware version',        tagName: 'byte4',  numItem: 1, size: 1,  disp: 'basic', c_code: 'char firmware_version',                  desc: '' },
			{ name: 'fwRevision',      label: 'Firmware revision',       tagName: 'byte5',  numItem: 1, size: 1,  disp: 'basic', c_code: 'char firmware_revision',                 desc: '' },
			{ name: 'fwBuild',         label: 'Firmware build',          tagName: 'dword6', numItem: 1, size: 4,  disp: 'basic', c_code: 'long firmware_build',                    desc: '' },
			{ name: 'buildDay',        label: 'Build day',               tagName: 'byte7',  numItem: 1, size: 1,  disp: 'adv',   c_code: 'char build_day',                         desc: '' },
			{ name: 'buildMonth',      label: 'Build month',             tagName: 'byte8',  numItem: 1, size: 1,  disp: 'adv',   c_code: 'char build_month',                       desc: '' },
			{ name: 'buildYear',       label: 'Build year',              tagName: 'word9',  numItem: 1, size: 2,  disp: 'adv',   c_code: 'short build_year',                       desc: '' },
			{ name: 'numObjType',      label: 'Number of object type',   tagName: 'word10', numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short  nb_obj_type',            desc: '' },
			{ name: 'mdlRole',         label: 'Module role',             tagName: 'byte11', numItem: 1, size: 1,  disp: 'basic', c_code: 'char module_role',                       desc: '' },
			{ name: 'factoryDfltVers', label: 'Factory default version', tagName: 'word12', numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short factory_default_version', desc: '' }
		];

		vm.objRecGblSync = [
			{ name: 'gblSyncCnt',      label: 'Global sync counter',     tagName: 'dword0', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long   gbl_sync_cnt',           desc: 'Global sync counter'},
		];

		vm.objType = {
			name: 'Record Table',
			objTypeTag: 'rec_tbl',
			desc: 'Object type Record Table',
			objTypeId: 20,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 50,
			objRecTbl: [{ name: 'config',   label: 'Configuration',       recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'info_ext', label: 'Extended info',       recTag: 'info_ext', tblTags: vm.objRecInfoExt,   desc: 'Object info extended data' },
                        { name: 'syncCnt',  label: 'Global sync counter', recTag: 'sync',     tblTags: vm.objRecGblSync,   desc: 'Global sync counter data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
