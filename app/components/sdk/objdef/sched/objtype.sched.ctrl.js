(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_SCHED
	app.controller('ObjTypeCtrl_Sched', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',      label: 'Object status',         tagName: 'obj_status',  numItem: 1,   size: 1,  disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',          label: 'Valid',                 tagName: 'valid',       numItem: 1,   size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',       label: 'Read only',             tagName: 'ro',          numItem: 1,   size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',  label: 'Cannot be deleted',     tagName: 'protect',     numItem: 1,   size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'guid',           label: 'GUID',                  tagName: 'guid2',       numItem: 1,   size: 16, disp: 'adv',   c_code: 'unsigned char guid[16]',         desc: 'Guid' },
			{ name: 'label',          label: 'Display name',          tagName: 'label3',      numItem: 1,   size: 64, disp: 'basic', c_code: 'unsigned char label[64]',        desc: 'Label: Display name' },
			{ name: 'startDate',      label: 'Start date',            tagName: 'utc_time4',   numItem: 1,   size: 4,  disp: 'basic', c_code: 'unsigned long begin_unix_utc',   desc: 'Start date: Epoch time for this schedule' },
			{ name: 'recurrence',     label: 'Cycle length (days)',   tagName: 'dword5',      numItem: 1,   size: 4,  disp: 'basic', c_code: 'unsigned long recurrence_sec',   desc: 'Cycle length (days) saved in sec' },
			{ name: 'offsetSecStart', label: 'Offset start (sec)',    tagName: 'dword6',      numItem: 100, size: 4,  disp: 'basic', c_code: 'unsigned long offset_sec_start', desc: 'Offset start (sec)' },
			{ name: 'offsetSecStop',  label: 'Offset stop (sec)',     tagName: 'dword7',      numItem: 100, size: 4,  disp: 'basic', c_code: 'unsigned long offset_sec_stop',  desc: 'Offset stop (sec)' },
			{ name: 'inclusion',      label: 'Inclusion',             tagName: 'bit_field8',  numItem: 1,   size: 13, disp: 'basic', c_code: 'char inclusion_bitfield[13]',    desc: 'Holiday inclusion bits (max 100 inclusions)' },
            { name: 'exclusion',      label: 'Exclusion',             tagName: 'bit_field9',  numItem: 1,   size: 13, disp: 'basic', c_code: 'char exception_bitfield[13]',    desc: 'Holiday exception bits (max 100 exceptions)' },
			{ name: 'inclusionExt',   label: 'Inclusion extended',    tagName: 'bit_field10', numItem: 1,   size: 3,  disp: 'adv',   c_code: 'char inclusion_ext_bitfield[3]', desc: 'Holiday inclusion ext bits (max 128 inclusions for centaur) 104-127' },
            { name: 'exclusionExt',   label: 'Exclusion extended',    tagName: 'bit_field11', numItem: 1,   size: 3,  disp: 'adv',   c_code: 'char exception_ext_bitfield[3]', desc: 'Holiday exception ext bits (max 128 exceptions for centaur) 104-127' },
            { name: 'holidayGr',      label: 'Period Holiday group',  tagName: 'byte12',      numItem: 8,   size: 1,  disp: 'adv',   c_code: 'char period_holiday_group[8]',   desc: 'Holiday group' },
            { name: 'optCentaurMode', label: 'Option - Centaur mode', tagName: 'bit13',       numItem: 1,   size: 1,  disp: 'adv',   c_code: 'char option.centaur_mode:1',     desc: 'Validate schedule as centaur' }
        ];

        vm.objRecStatus = [
			{ name: 'status',          label: 'Status',                    tagName: 'byte0',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char Status',           desc: '0=SCHED_INVALID; 1=SCHED_VALID; 2=SCHED_UNKNOWN; 3=SCHED_TIME_INVALID; 4=SCHED_OUTSIDE_PERIOD' }
		];

		vm.objEvt = [
            { id: 0, desc: 'Schedule - Ended' },
            { id: 1, desc: 'Schedule - Started' }
		];

		vm.objType = {
			name: 'Schedule',
			objTypeTag: 'sched',
			desc: 'Object type Schedule',
			objTypeId: 22,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 250,
            objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',        recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data'        }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
