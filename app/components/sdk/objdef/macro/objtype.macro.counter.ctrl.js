(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MACRO
	app.controller('ObjTypeCtrl_MacroCounter', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',         label: 'Object status',                       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                  desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',             label: 'Valid',                               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Active' },
			{ name: 'readOnly',          label: 'Read only',                           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',     label: 'Cannot be deleted',                   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',    desc: 'Entity Flag: Protected' },
			{ name: 'label',             label: 'Display name',                        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                   desc: 'Label: Display name' },
            { name: 'counterMax',        label: 'Maximum counter value',               tagName: 'dword3',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long CounterMax',         desc: 'Maximum counter value' },
            { name: 'optReloadBootUp',   label: 'Option reload at boot up',            tagName: 'bit4',       numItem: 1, size: 1,   disp: 'adv',   c_code: 'char Opt.b_AutoReload_BootUp :1',  desc: 'Option to reload the counter at boot-up' },
            { name: 'optReloadZero',     label: 'Option reload at zero',               tagName: 'bit5',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char Opt.b_AutoReload_Zero :1',    desc: 'Option to reload the counter at zero' },
            { name: 'optResetCountMax',  label: 'Option reset at count max',           tagName: 'bit6',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char Opt.b_AutoReset_CountMax :1', desc: 'Option to reset the counter at counter max' },
            { name: 'optOverflowEn',     label: 'Option count max overflow enable',    tagName: 'bit7',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char Opt.b_OverflowEnable :1',     desc: 'Allow counter to go higher than counter max value' }
        ];
		vm.objRecStatus = [
			{ name: 'cnt',               label: 'Count',                               tagName: 'dword0',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long Count',            desc: 'Count value' },
        ];

		vm.objCmdSet = [
			{ name: 'cnt',               label: 'Counter',                             tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long Counter',           desc: 'New counter value to set' }
		];

		vm.objEvt = [
            { id: 0, desc: 'Macro Counter - Counter reached zero'    },
            { id: 1, desc: 'Macro Counter - Counter incremented'     },
            { id: 2, desc: 'Macro Counter - Counter decremented'     },
            { id: 3, desc: 'Macro Counter - Counter reached maximum' },
            { id: 4, desc: 'Macro Counter - Counter reset'           },
            { id: 5, desc: 'Macro Counter - Counter reloaded'        },
            { id: 6, desc: 'Macro Counter - Counter value set'       }
        ];

		vm.objType = {
			name: 'Macro Counter',
			objTypeTag: 'macro_cnt',
			desc: 'Object type Macro Counter',
			objTypeId: 79,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 50,
            objRecTbl: [{ name: 'config', label: 'Configuration',     recTag: 'cfg',    tblTags: vm.objRecCfg,    desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',            recTag: 'status', tblTags: vm.objRecStatus, desc: 'Object status data'        }],
            objCmdTbl: [{ name: 'reset',  label: 'Reset counter',     recTag: 'reset',  tblTags: null,            desc: 'Reset counter' },
                        { name: 'incr',   label: 'Increment counter', recTag: 'incr',   tblTags: null,            desc: 'Increment counter' },
                        { name: 'decr',   label: 'Decrement counter', recTag: 'decr',   tblTags: null,            desc: 'Decrement counter' },
                        { name: 'reload', label: 'Reload counter',    recTag: 'reload', tblTags: null,            desc: 'Reload counter' },
                        { name: 'set',    label: 'Set counter value', recTag: 'set',    tblTags: vm.objCmdSet,    desc: 'Set counter value' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
            };

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
