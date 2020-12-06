(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MODULE
	app.controller('ObjTypeCtrl_Mdl', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'label',                label: 'Display name',                       tagName: 'label0',   numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                                                  desc: 'Label: Display name' },
			{ name: 'optSupportAntiPback',  label: 'Option anti-passback supported',     tagName: 'bit1',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.antipass_back_supported:1',     desc: 'Module option - support ANTI_PASSBACK' },
			{ name: 'optSupportInterlock',  label: 'Option interlock supported',         tagName: 'bit2',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.interlock_supported:1',         desc: 'Module option - support INTERLOCK' },
			{ name: 'optSupportAlarmInteg', label: 'Option alarm integration supported', tagName: 'bit3',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.alarm_integration_supported:1', desc: 'Module option - support ALARM_INTEG' },
			{ name: 'optSupportMaster',     label: 'Option master mode supported',       tagName: 'bit4',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.master_supported:1',            desc: 'Module option - support MASTER' },
			{ name: 'optSupportRole',       label: 'Option role supported',              tagName: 'bit6',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.role_supported:1',              desc: 'Module option - support ROLE' },
			{ name: 'optSupportUserFloor',  label: 'Option user floor supported',        tagName: 'bit7',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.user_floor_supported:1',        desc: 'Module option - support USER_FLOOR' },
			{ name: 'optSupportCnil',       label: 'Option CNIL supported',              tagName: 'bit8',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.cnil_supported:1',              desc: 'Module option - support CNIL' },
			{ name: 'optAlarmEnable',       label: 'Option alarm integration enabled',   tagName: 'bit9',     numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned short enabled_features.alarm_integration:1',             desc: 'Module option - enable ALARM_INTEG' },
			{ name: 'optMasterEnable',      label: 'Option master mode enabled',         tagName: 'bit10',    numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned short enabled_features.master_enabled:1',                desc: 'Module option - enable MASTER' },
			{ name: 'optCnilEnable',        label: 'Option CNIL enabled',                tagName: 'bit11',    numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned short enabled_features.cnil_enabled:1',                  desc: 'Module option - enable CNIL' },
			{ name: 'globalSerial',         label: 'Global serial number',               tagName: 'serial12', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long  global_serial',                                    desc: 'Global serial number: global events forwarded to this destination' },
            { name: 'role',                 label: 'Role',                               tagName: 'byte13',   numItem: 1, size: 1,  disp: 'basic', c_code: 'char role',                                                       desc: 'module role: 0=expander; 1=controller; 2=gateway' },
            { name: 'mode',                 label: 'Mode',                               tagName: 'byte14',   numItem: 1, size: 1,  disp: 'adv',   c_code: 'char mode',                                                       desc: 'Mode of functionality (AP22 or AP22R)' },
            { name: 'optSupportLockdown',   label: 'Option LOCKDOWN supported',          tagName: 'bit15',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.lockdown_supported:1',          desc: 'Module option - support LOCKDOWN' },
            { name: 'optSupportGblSyncCnt', label: 'Option Global Sync Supported',       tagName: 'bit16',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned short supported_features.global_sync_counter:1',         desc: 'Module option - support Global Sync Counter' }
		];

        vm.objRecIoState = [
            { name: 'MdlOpMode',            label: 'Mdl Operation Mode',                 tagName: 'bit0',     numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned short module_io_state.module_operation_mode:1', desc: 'Mdl - IO State - Operation Mode' }
        ];
		vm.objCmdGlobalSer = [
			{ name: 'globalSerial',         label: 'Global serial number',               tagName: 'serial0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long global_serial',                                     desc: 'Global serial number: global events forwarded to this destination' },
			{ name: 'optSupportAntiPback',  label: 'Option anti-passback supported',     tagName: 'bit1',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.antipass_back_supported:1',     desc: 'Module option - support ANTI_PASSBACK' },
			{ name: 'optSupportInterlock',  label: 'Option interlock supported',         tagName: 'bit2',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.interlock_supported:1',         desc: 'Module option - support INTERLOCK' },
			{ name: 'optSupportAlarmInteg', label: 'Option alarm integration supported', tagName: 'bit3',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.alarm_integration_supported:1', desc: 'Module option - support ALARM_INTEG' },
			{ name: 'optSupportMaster',     label: 'Option master mode supported',       tagName: 'bit4',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.master_supported:1',            desc: 'Module option - support MASTER' },
			{ name: 'optSupportRole',       label: 'Option role supported',              tagName: 'bit6',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.role_supported:1',              desc: 'Module option - support ROLE' },
			{ name: 'optSupportUserFloor',  label: 'Option user floor supported',        tagName: 'bit7',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.user_floor_supported:1',        desc: 'Module option - support USER_FLOOR' },
			{ name: 'optSupportCnil',       label: 'Option CNIL supported',              tagName: 'bit8',    numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.cnil_supported:1',              desc: 'Module option - support CNIL' },
			{ name: 'optAlarmEnable',       label: 'Option alarm integration enabled',   tagName: 'bit9',    numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short enabled_features.alarm_integration:1',             desc: 'Module option - enable ALARM_INTEG' },
			{ name: 'optMasterEnable',      label: 'Option master mode enabled',         tagName: 'bit10',   numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short enabled_features.master_enabled:1',                desc: 'Module option - enable MASTER' },
            { name: 'optCnilEnable',        label: 'Option CNIL enabled',                tagName: 'bit11',   numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short enabled_features.cnil_enabled:1',                  desc: 'Module option - enable CNIL' },
            { name: 'optSupportLockdown',   label: 'Option LOCKDOWN supported',          tagName: 'bit12',   numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.lockdown_supported:1',          desc: 'Module option - support LOCKDOWN' },
            { name: 'optSupportGblSyncCnt', label: 'Option Global Sync Supported',       tagName: 'bit13',   numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned short supported_features.global_sync_counter:1',         desc: 'Module option - support Global Sync Counter' }
		];

		vm.objType = {
			name: 'Module',
			objTypeTag: 'mdl',
			desc: 'Object type Module',
			objTypeId: 40,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',     label: 'Configuration', 			 recTag: 'cfg',          tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
			            { name: 'io',         label: 'Io',                       recTag: 'io',           tblTags: vm.objRecIoState,   desc: 'Object io data' }],
			objCmdTbl: [{ name: 'restart',    label: 'Restart', 				 recTag: 'restart',      tblTags: null,               desc: 'Restart the device (power down, power up)' },
						{ name: 'dflt',       label: 'Reset to default', 		 recTag: 'dflt',         tblTags: null,               desc: 'Apply factory default to the device' },
						{ name: 'reset',      label: 'Reset bootloader memory',  recTag: 'reset',        tblTags: null,               desc: 'Reset the bootloader memory drive' },
						{ name: 'locate_on',  label: 'Locate on', 				 recTag: 'locate_on',    tblTags: null,               desc: 'Start the locate mode' },
						{ name: 'locate_off', label: 'Locate off', 				 recTag: 'locate_off',   tblTags: null,               desc: 'Stop the locate mode' },
						{ name: 'global',     label: 'Set global serial number', recTag: 'global',       tblTags: vm.objCmdGlobalCmd, desc: 'Set global serial number and options' },
						{ name: 'dflt_no_ip', label: 'Reset to default no IP',   recTag: 'dflt_no_ip',   tblTags: null,               desc: 'Apply factory default to the device preserving the ip connection settings' }],
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
