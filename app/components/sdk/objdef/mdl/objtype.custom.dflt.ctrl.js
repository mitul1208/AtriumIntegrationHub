(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_LICENSE
	app.controller('ObjTypeCtrl_CustomDflt', ["$sdkObjTypeSvc", function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',      label: 'Object status',         tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',          label: 'Valid',                 tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',       label: 'Read only',             tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',  label: 'Cannot be deleted',     tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',          label: 'Display name',          tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
            { name: 'objId',          label: 'Object ID',             tagName: 'dword3',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long  ObjId',          desc: 'Object id to modify. Use 0xFFFFFFFF to add new at the end of existing list' },
            { name: 'objType',        label: 'Object Type',           tagName: 'word4',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short ObjType',        desc: 'Object type to modify/add' },
            { name: 'objRec',         label: 'Object Record',         tagName: 'word5',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short ObjRec',         desc: 'Specific record type to modify/add' },
            { name: 'objSdkTagId',    label: 'Object SDK Tag ID',     tagName: 'word6',      numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short ObjSdkTagId',    desc: 'SDK tag id to use. Used to retrieve the data descriptor. Use 0xFFFF to write all record (big endian binary).' },
            { name: 'objSdkSubTagId', label: 'Object SDK Sub-tag ID', tagName: 'word7',      numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short ObjSdkSubTagId', desc: 'SDK sub tag id to use (index in the tag id table when applicable)' },
            { name: 'objDataLen',     label: 'Object Data Length',    tagName: 'word8',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short ObjDataLen',     desc: 'Size of the binary raw data to write. Should match SDK tag id size' },
            { name: 'objData',        label: 'Object Data',           tagName: 'hexa9',      numItem: 1, size: 256, disp: 'basic', c_code: 'unsigned char ObjData[256]',    desc: 'Binary raw data to write (saved as big endian)' }
		];

		vm.objRecStatus = [
            { name: 'dfltApplied',   label: 'Default applied',       tagName: 'byte0',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char DfltApplied', desc: 'Indicates if the default has been applied (1) or not (0)' }
        ];

		vm.objType = {
			name: 'Custom Default',
			objTypeTag: 'custom_dflt',
			desc: 'Object type Custom Default',
			objTypeId: 94,
            disp: 'adv',      // 'advanced'
			group: 'Local',
			numObjIdDflt: 32,
			objRecTbl: [{ name: 'config',       label: 'Configuration',  recTag: 'cfg',      tblTags: vm.objRecCfg,    desc: 'Object configuration data' },
                        { name: 'status',       label: 'Status', 		 recTag: 'status',   tblTags: vm.objRecStatus, desc: 'Object status data'        }],
			objCmdTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	}]);

})();
