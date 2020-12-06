(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_IPCOM_CLIENT
	app.controller('ObjTypeCtrl_IpClient', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                  desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',      tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char label[64]',          desc: 'Label: Display name' },
			{ name: 'serial',        label: 'Serial number',     tagName: 'serial3',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long serial',             desc: 'Module - Serial number' },
			{ name: 'ipAddr',        label: 'IP Address',        tagName: 'ip4',        numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long ip_address',         desc: 'Module - IP Address' },
			{ name: 'swPort',        label: 'Software port',     tagName: 'word5',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short udp_port',          desc: 'Module - Software port' },
			{ name: 'pswd',          label: 'Connection key',    tagName: 'pswd6',      numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char connection_key[64]', desc: 'Module - Connection key - Password' },
			{ name: 'url',           label: 'URL',               tagName: 'url7',       numItem: 1, size: 128, disp: 'adv',   c_code: 'unsigned char url[128]',           desc: 'Module - URL Address' },
			{ name: 'webPort',       label: 'Web port',          tagName: 'word8',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short web_port',          desc: 'Module - Web port' },
			{ name: 'username',      label: 'Username',          tagName: 'utf9',       numItem: 1, size: 64,  disp: 'adv',   c_code: 'unsigned char username[64]',       desc: 'Module - Username - hidden - 32 Options: Option 1: UTF16[0] = 0x00 + UTF16[1] = 0x41 -> Force AES-256 enabled = A' }
		];

		vm.objRecStatus = [
			{ name: 'status', label: 'Status', tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'char status', desc: 'ipcomc status: 0=offline; 1=online; 2=synchronizing; 3=bad connection key; 4=no connection available; 5=connection to master refused' },
		];

		vm.objEvt = [
			{ id: 0, desc: 'IP client - Offline' },
			{ id: 1, desc: 'IP client - Online' },
			{ id: 2, desc: 'IP client - Synchronizing' },
			{ id: 3, desc: 'IP client - Bad connection key' },
			{ id: 4, desc: 'IP client - No more connection available' },
			{ id: 5, desc: 'IP client - Connection to master refused' }
		];

		vm.objType = {
			name: 'IP Client',
			objTypeTag: 'ip_client',
			desc: 'Object type IP Client',
			objTypeId: 58,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 49,
			objRecTbl: [{ name: 'config', label:  'Configuration',         recTag: 'cfg',      tblTags: vm.objRecCfg,    desc: 'Object configuration data'            },
						{ name: 'status', label:  'Status', 		       recTag: 'status',   tblTags: vm.objRecStatus, desc: 'Object status data'                   }],
            objCmdTbl: [{ name: 'refresh', label: 'Refresh IP connection', recTag: 'refresh',  tblTags: null,            desc: 'Refresh the device link informations' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
