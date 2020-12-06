(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_IPCONNECTION
	app.controller('ObjTypeCtrl_IpConnection', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',         tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                  desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',                 tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',             tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted',     tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Protected' },
			{ name: 'optDhcp',       label: 'DHCP enable',           tagName: 'bit2',       numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char flag_dhcp',          desc: 'Options - Uses DHCP' },
			{ name: 'ipAddr',        label: 'IP address',            tagName: 'ip4',        numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long ip_address',         desc: 'IP address' },
			{ name: 'subnetMask',    label: 'Subnet mask',           tagName: 'ip5',        numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long subnet_mask',        desc: 'Subnet Mask' },
			{ name: 'gateway',       label: 'Gateway',               tagName: 'ip6',        numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long gateway',            desc: 'Gateway' },
			{ name: 'swPort',        label: 'Software port',         tagName: 'word7',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short udp_port_software', desc: 'Software port' },
			{ name: 'webPort',       label: 'Web port',              tagName: 'word8',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short tcp_port_web',      desc: 'Web port' },
			{ name: 'username',      label: 'Username',              tagName: 'utf9',       numItem: 1, size: 64, disp: 'adv',   c_code: 'char username[64]',                desc: 'Username - hidden - N/U' },
			{ name: 'pswd',          label: 'Module connection key', tagName: 'pswd10',     numItem: 1, size: 64, disp: 'basic', c_code: 'char password[64]',                desc: 'Module connection key - Password' },
			{ name: 'macAddr',       label: 'MAC address',           tagName: 'hexa11',     numItem: 1, size: 6,  disp: 'basic', c_code: 'char mac_address[6]',              desc: 'MAC address (protected, read-only)' },
			{ name: 'dnsIpAddr',     label: 'DNS ip address',        tagName: 'ip12',       numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long dns_address',        desc: 'DNS IP address' },
			{ name: 'optTcpUdp',     label: 'Option TCP/UDP',        tagName: 'bit13',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char cfg.tcp_or_udp:1',   desc: '0=tcp; 1=udp ->used for caethr' },
		];

		vm.objType = {
			name: 'IP Connection',
			objTypeTag: 'ip_conn',
			desc: 'Object type IP Connection',
			objTypeId: 28,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
