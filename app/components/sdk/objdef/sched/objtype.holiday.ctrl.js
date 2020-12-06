(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_HOLIDAY
	app.controller('ObjTypeCtrl_Holiday', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',             tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',                     tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',                 tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',         tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'guid',            label: 'GUID',                      tagName: 'guid2',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char guid[16]',                  desc: 'Guid' },
			{ name: 'label',           label: 'Display name',              tagName: 'label3',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                 desc: 'Label: Display name' },
			{ name: 'propYearly',      label: 'Option - Occurs Yearly',    tagName: 'bit4',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option.is_yearly:1',        desc: 'Holiday Property - Occurs Yearly' },
			{ name: 'propRelativeDay', label: 'Option - Use relative day', tagName: 'bit5',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option.use_relative_day:1', desc: 'Holiday Property - Use relative day' },
			{ name: 'date',            label: 'Date (unix)',               tagName: 'utc_time7',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long unix_time',        desc: 'Date (unix)' },
			{ name: 'relDayOfWk',      label: 'Relative day of week',      tagName: 'byte8',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char relative_day_of_week',      desc: '0=Sunday; 1=Monday; 2=Tuesday; 3=Wednesday; 4=Thursday; 5=Friday; 6=Saturday' },
			{ name: 'startSecond',     label: 'Start seconds',             tagName: 'dword9',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long start_seconds',    desc: 'Start time (sec)' },
			{ name: 'duration',        label: 'Duration',                  tagName: 'dword10',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long duration',         desc: 'Duration: (sec)' },
        ];

        vm.objRecStatus = [
			{ name: 'status',          label: 'Status',                    tagName: 'byte0',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char Status',           desc: '0=SCHED_INVALID; 1=SCHED_VALID; 2=SCHED_UNKNOWN; 3=SCHED_TIME_INVALID; 4=SCHED_OUTSIDE_PERIOD' }
		];

		vm.objEvt = [
            { id: 0, desc: 'Holiday - Ended' },
            { id: 1, desc: 'Holiday - Started' }
		];

		vm.objType = {
			name: 'Holiday',
			objTypeTag: 'holiday',
			desc: 'Object type Holiday',
			objTypeId: 23,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 100,
            objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',        recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data'        }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
