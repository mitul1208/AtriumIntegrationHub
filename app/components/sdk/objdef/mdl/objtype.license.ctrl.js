(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_LICENSE
	app.controller('ObjTypeCtrl_License', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'licenseKey',    label: 'License Key',       tagName: 'hexa3',      numItem: 1, size: 128, disp: 'basic', c_code: 'unsigned char LicenseKey[128]', desc: 'License key' }
		];

		vm.objRecStatus = [
			{ name: 'numObjId',      label: 'Maximum object Id', tagName: 'dword0',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long NumObjId',        desc: '0: invalid license; -1: active unlimited; 1+: active limited' },
		];

		vm.objRecKeyGenStatus = [
            { name: 'key',           label: 'License Key',            tagName: 'hexa0',     numItem: 1, size: 128, disp: 'basic', c_code: 'unsigned char LicenseKey[128]',   desc: 'Generated license key' },
            { name: 'expirationUtc', label: 'Expiration date UTC',    tagName: 'utc_time1', numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long ExpirationDateUTC', desc: 'Expiration date (UTC): 0xFFFFFFFF = no limitation' },
            { name: 'objType',       label: 'Object Type',            tagName: 'word2',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short ObjType',          desc: 'SDK=76; User=11' },
            { name: 'prodId',        label: 'Product Id',             tagName: 'word3',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short ProductId',	       desc: 'Product id of the device license' },
            { name: 'famId',         label: 'Family Id',              tagName: 'word4',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short FamilyId',	       desc: 'Family id of the device license' },
            { name: 'sn',            label: 'Serial Number',          tagName: 'serial5',   numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long ObjSerialOwner',    desc: 'Serial number of the device license' },
            { name: 'objIdMax',      label: 'Object Id Max',          tagName: 'dword6',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long ObjId',             desc: 'Limited to a certain amount of object id: 0xFFFFFFFF = no limitation' },
            { name: 'optChildEn',    label: 'Option - child enabled', tagName: 'bit7',      numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char OptChildEn : 1',    desc: 'License key option - Child enabled' },
            { name: 'objRec',        label: 'Object record',          tagName: 'byte8',     numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char ObjRec',            desc: 'Limited to specific record type: 0xFF = no limitation' },
            { name: 'objCmd',        label: 'Object command',         tagName: 'byte9',     numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char ObjCmd',            desc: 'Limited to specific command: 0xFF = no limitation' },
		];

        vm.objCmdKeyGen = [
            { name: 'expirationUtc', label: 'Expiration date UTC',    tagName: 'utc_time0', numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long ExpirationDateUTC', desc: 'Expiration date (UTC): 0xFFFFFFFF = no limitation' },
            { name: 'sn',            label: 'Serial Number',          tagName: 'serial1',   numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long ObjSerialOwner',    desc: 'Serial number of the device license' },
            { name: 'objIdMax',      label: 'Object Id Max',          tagName: 'dword2',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long ObjId',             desc: 'Limited to a certain amount of object id: 0xFFFFFFFF = no limitation' },
            { name: 'objType',       label: 'Object Type',            tagName: 'word3',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short ObjType',          desc: 'SDK=76; User=11' },
            { name: 'prodId',        label: 'Product Id',             tagName: 'word4',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short ProductId',	       desc: 'Product id of the device license' },
            { name: 'famId',         label: 'Family Id',              tagName: 'word5',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short FamilyId',	       desc: 'Family id of the device license' },
            { name: 'optChildEn',    label: 'Option - child enabled', tagName: 'bit6',      numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char OptChildEn : 1',    desc: 'License key option - Child enabled' },
            { name: 'objRec',        label: 'Object record',          tagName: 'byte7',     numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char ObjRec',            desc: 'Limited to specific record type: 0xFF = no limitation' },
            { name: 'objCmd',        label: 'Object command',         tagName: 'byte8',     numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char ObjCmd',            desc: 'Limited to specific command: 0xFF = no limitation' },
		];

		vm.objType = {
			name: 'License',
			objTypeTag: 'license',
			desc: 'Object type License',
			objTypeId: 88,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',       label: 'Configuration',  recTag: 'cfg',      tblTags: vm.objRecCfg,          desc: 'Object configuration data' },
						{ name: 'keyGenStatus', label: 'Key Gen Status', recTag: 'status2',  tblTags: vm.objRecKeyGenStatus, desc: 'Read generated key' },
                        { name: 'status',       label: 'Status', 		 recTag: 'status',   tblTags: vm.objRecStatus,       desc: 'Object status data' }],
			objCmdTbl: [{ name: 'cmdKeyGen',    label: 'Key Gen Rqst',   recTag: 'key_gen',  tblTags: vm.objCmdKeyGen,       desc: 'Key gen request' }],
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
