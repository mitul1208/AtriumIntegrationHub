(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_INPUT
	app.controller('ObjTypeCtrl_Input', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',            label: 'Object status',           tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                     desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                label: 'Valid',                   tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Active' },
			{ name: 'readOnly',             label: 'Read only',               tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',        label: 'Cannot be deleted',       tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Protected' },
			{ name: 'label',                label: 'Display name',            tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                      desc: 'Label: Display name' },
            { name: 'optNormOpen',          label: 'Option normally open',    tagName: 'bit3',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option.NO : 1',                  desc: 'Reversed logic: 0=Normally close; 1=Normally Open' },
            { name: 'optSchedEn',           label: 'Option Schedule Enabled', tagName: 'bit4',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option.SchedEnable : 1',         desc: 'Input Schedule: 0=Disabled; 1=Enabled' },
			{ name: 'inputResponseTime',    label: 'Input response time',     tagName: 'word5',      numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short debouce_open',         desc: 'Input response time (ms)' },
            { name: 'inputRestoreTime',     label: 'Input restore time',      tagName: 'word6',      numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short debouce_close',        desc: 'Input restore time (ms)' },
            { name: 'schedId',              label: 'Schedule ID',             tagName: 'word7',      numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short ScheduleId',           desc: 'Input schedule id: will not generate events outside of this schedule' },
            { name: 'selfBypassDelay_sec',  label: 'Self Bypass Delay (sec)', tagName: 'word8',      numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short SelfBypassDelay_sec',  desc: 'Input bypass delay (in sec) to use when bypassed using cmd INPUT_CMD_BYPASS_ON_SELF_DELAY. 0 = latch' }
        ];

		vm.objRecStatus = [
			{ name: 'contactState',   label: 'Contact state',   tagName: 'byte0',     numItem: 1, size: 1, disp: 'basic', c_code: 'char contact_state',             desc: 'Open(0), Close(1), Short(2), Cut(3), Mask(4), Trouble(5), Unknown(FF)' },
			{ name: 'stateMask',      label: 'State mask',      tagName: 'byte1',     numItem: 1, size: 1, disp: 'basic', c_code: 'char StateMask',                 desc: '0x01: Bypassed' },
			{ name: 'timestampUTC',   label: 'Timestamp UTC',   tagName: 'utc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long  timestamp_UTC',   desc: 'Timestamp UTC on last transition' },
			{ name: 'timestampLocal', label: 'Timestamp local', tagName: 'loc_time3', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long  timestamp_LOCAL', desc: 'Timestamp Local on last transition' }
		];

		vm.objCmdInputBypOn = [
			{  name: 'bypDelay_sec', label: 'Bypass delay (sec)', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long BypassDelay_sec',  desc: 'Delay (in sec) for which the input has to remain bypassed. Zone will unbypassed itself after specified delay. 0 = bypass forever' }
        ];

		vm.objEvt = [
			{ id: 0, desc: 'Input - Breach' },
			{ id: 1, desc: 'Input - Normal' },
			{ id: 2, desc: 'Input - Short' },
			{ id: 3, desc: 'Input - Cut' },
			{ id: 4, desc: 'Input - Mask' },
			{ id: 5, desc: 'Input - Trouble' },
			{ id: 6, desc: 'Input - Mask restored' },
            { id: 7, desc: 'Input - Unknown' },
            { id: 8, desc: 'Input - Bypass off' },
            { id: 9, desc: 'Input - Bypass on' }
		];

		vm.objType = {
			name: 'Input logic',
			objTypeTag: 'input',
			desc: 'Object type Input logic',
			objTypeId: 9,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 12,
            objRecTbl: [{ name: 'config',   label: 'Configuration',                 recTag: 'cfg',        tblTags: vm.objRecCfg,        desc: 'Object configuration data' },
                        { name: 'status',   label: 'Status', 		                recTag: 'status',     tblTags: vm.objRecStatus,     desc: 'Object status data'        }],
			objCmdTbl: [{ name: 'local',    label: 'Local events',                  recTag: 'local',      tblTags: null,                desc: 'Set object events destination to remain local' },
                        { name: 'global',   label: 'Global events',                 recTag: 'global',     tblTags: null,                desc: 'Set object events destination to be forwarded to the global serial number' },
                        { name: 'bypOff',   label: 'Unbypass input',                recTag: 'byp_off',    tblTags: null,                desc: 'Un-bypass input' },
                        { name: 'bypOn',    label: 'Bypass input',                  recTag: 'byp_on',     tblTags: vm.objCmdInputBypOn, desc: 'Bypass input for a specific delay: 0 = latch' },
                        { name: 'bypOnDly', label: 'Bypass input with self delay',  recTag: 'byp_on_dly', tblTags: null,                desc: 'Bypass input using self bypass delay from input config' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
