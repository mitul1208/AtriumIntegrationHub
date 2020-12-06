(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MACRO
	app.controller('ObjTypeCtrl_MacroTimer', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',         label: 'Object status',                       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',             label: 'Valid',                               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',          label: 'Read only',                           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',     label: 'Cannot be deleted',                   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'label',             label: 'Display name',                        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                 desc: 'Label: Display name' },
            { name: 'reloadVal',         label: 'Reload timer value (seconds)',        tagName: 'dword3',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long ReloadValue_sec',  desc: 'Reload timer value in second' },
            { name: 'optRestartBootUp',  label: 'Option restart at boot up',           tagName: 'bit4',       numItem: 1, size: 1,   disp: 'adv',   c_code: 'char b_AutoRestart_BootUp :1',   desc: 'Option to restart the timer at boot-up' },
            { name: 'optPeriodic',       label: 'Option - Timer is period',            tagName: 'bit5',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char Opt.b_Periodic :1',         desc: 'Option to reload the timer on overflow' }
        ];
		vm.objRecStatus = [
            { name: 'tmrVal',            label: 'Timer current value',                 tagName: 'dword0',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long TmrVal_ms',        desc: 'Timer current value (seconds)' },
            { name: 'state',             label: 'State',                               tagName: 'byte1',     numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char State',            desc: 'Timer state: 0=inactive; 1=active' }
        ];

		vm.objCmdSet = [
			{ name: 'tmrVal_sec',        label: 'Timer value (seconds)',               tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long TimerVal_sec',     desc: 'Timer value to set (in seconds)' }
		];

		vm.objEvt = [
            { id: 0, desc: 'Macro Timer - Timer stopped'   },
            { id: 1, desc: 'Macro Timer - Timer started'   },
            { id: 2, desc: 'Macro Timer - Timer reloaded'  },
            { id: 3, desc: 'Macro Timer - Timer ended'     },
            { id: 4, desc: 'Macro Timer - Timer value set' }
        ];

		vm.objType = {
			name: 'Macro Timer',
			objTypeTag: 'macro_tmr',
			desc: 'Object type Macro Timer',
			objTypeId: 78,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 50,
            objRecTbl: [{ name: 'config',  label: 'Configuration',   recTag: 'cfg',     tblTags: vm.objRecCfg,    desc: 'Object configuration data' },
                        { name: 'status',  label: 'Status',          recTag: 'status',  tblTags: vm.objRecStatus, desc: 'Object status data'        }],
            objCmdTbl: [{ name: 'stop',    label: 'Stop timer',      recTag: 'stop',    tblTags: null,            desc: 'Stop timer'                                  },
                        { name: 'start',   label: 'Start timer',     recTag: 'start',   tblTags: null,            desc: 'Start timer from current timer value'        },
                        { name: 'restart', label: 'Restart timer',   recTag: 'restart', tblTags: null,            desc: 'Reload timer value from config and start it' },
                        { name: 'set',     label: 'Set timer value', recTag: 'set',     tblTags: vm.objCmdSet,    desc: 'Set new timer value and start timer'         }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
            };

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
