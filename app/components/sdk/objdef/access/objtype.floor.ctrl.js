(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_FLOOR
	app.controller('ObjTypeCtrl_Floor', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;


		vm.objRecCfg = [
			{ name: 'objStatus',                label: 'Object status',                tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                                      desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                    label: 'Valid',                        tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',                        desc: 'Entity Flag: Active' },
			{ name: 'readOnly',                 label: 'Read only',                    tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                        desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',            label: 'Cannot be deleted',            tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                        desc: 'Entity Flag: Protected' },
			{ name: 'label',                    label: 'Display name',                 tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                                       desc: 'Label: Display name' },
			{ name: 'guid',                     label: 'GUID',                         tagName: 'guid3',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char guid[16]',                                        desc: 'Guid' },
			{ name: 'optFirstManIn',            label: 'Option first man in',          tagName: 'bit4',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option_flag.public_schedule_firstman_enable : 1', desc: '(N/U)' },
			{ name: 'optEarlyFirstMan',         label: 'Option early first man',       tagName: 'bit5',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option_flag.early_firstman_enable : 1',           desc: '(N/U)' },
			{ name: 'publicSchedId',            label: 'Public schedule id',           tagName: 'word7',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short public_schedule_id',                    desc: 'Public access - Schedule id' },
			{ name: 'earlyFirstManGracePeriod', label: 'Early first man grace period', tagName: 'word8',      numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short early_firstman_grace_sec',              desc: '(N/U)' }
        ];

        vm.objRecStatus = [
			{ name: 'status',          label: 'Status',                    tagName: 'byte0',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char status',           desc: '0=close; 1=open' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'Floor - Lock' },
			{ id: 1, desc: 'Floor - Unlock' },
			{ id: 2, desc: 'Floor - Early man enable' }
		];

		vm.objType = {
			name: 'Floor',
			objTypeTag: 'floor',
			desc: 'Object type Floor',
			objTypeId: 83,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 256,
            objRecTbl: [{ name: 'config', label: 'Configuration',   recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',          recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data'        }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
