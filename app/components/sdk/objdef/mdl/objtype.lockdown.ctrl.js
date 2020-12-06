(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_LICENSE
	app.controller('ObjTypeCtrl_Lockdown', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',          label: 'Object status',                           tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                                            desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',              label: 'Valid',                                   tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',                              desc: 'Entity Flag: Active' },
			{ name: 'readOnly',           label: 'Read only',                               tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                              desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',      label: 'Cannot be deleted',                       tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                              desc: 'Entity Flag: Protected' },
            { name: 'label',              label: 'Display name',                            tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                                             desc: 'Label: Display name' },
            { name: 'actOptTwoManRule',   label: 'Activation option - Two Man Rule',        tagName: 'bit4',       numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_LockdownOptActDeact_ts Activation.b_OptTwoManRule:1',   desc: 'Requires 2 man rule confirmation' },
            { name: 'actOptDualBadge',    label: 'Activation option - Double swipe',        tagName: 'bit5',       numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_LockdownOptActDeact_ts Activation.b_OptDoubleSwipe:1',   desc: 'Requires double swipe confirmation' },
            { name: 'actOptSwPswd',       label: 'Activation option - Software password',   tagName: 'bit6',       numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_LockdownOptActDeact_ts Activation.b_OptSwPswd:1',       desc: 'Requires software password confirmation' },
            { name: 'deactOptTwoManRule', label: 'Deactivation option - Two Man Rule',      tagName: 'bit7',       numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_LockdownOptActDeact_ts Deactivation.b_OptTwoManRule:1', desc: 'Requires 2 man rule confirmation' },
            { name: 'deactOptDualBadge',  label: 'Deactivation option - Double swipe',      tagName: 'bit8',       numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_LockdownOptActDeact_ts Deactivation.b_OptDoubleSwipe:1', desc: 'Requires double swipe confirmation' },
            { name: 'deactOptSwPswd',     label: 'Deactivation option - Software password', tagName: 'bit9',       numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_LockdownOptActDeact_ts Deactivation.b_OptSwPswd:1',     desc: 'Requires software password confirmation' },
		];

		vm.objRecStatus = [
			{ name: 'status',  label: 'Status', tagName: 'byte0',     numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char Status',  desc: '0: deactivated; 1: activated' },
		];

		vm.objCmdActDeact = [
            { name: 'swPswd',     label: 'Software password',    tagName: 'utf0',     numItem: 1, size: 64, disp: 'basic', c_code: 'SwPswd[L008_SIZEOF_PSWD]',  desc: 'Software password' }
		];

		vm.objEvt = [
            { id: 0, desc: 'Lockdown - Deactivated' },
            { id: 1, desc: 'Lockdown - Activated' }
		];

		vm.objType = {
			name: 'Lockdown',
			objTypeTag: 'lockdown',
			desc: 'Object type Lockdown',
			objTypeId: 89,
            disp: 'adv',
			group: 'Global',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',          label: 'Configuration',            recTag: 'cfg',      tblTags: vm.objRecCfg,      desc: 'Object configuration data' },
                        { name: 'status',          label: 'Status', 		          recTag: 'status',   tblTags: vm.objRecStatus,   desc: 'Object status data' }],
            objCmdTbl: [{ name: 'cmdDeactivate',   label: 'Lockdown Deactivation',    recTag: 'stop',     tblTags: null,              desc: 'Lockdown Deactivation request' },
                        { name: 'cmdActivate',     label: 'Lockdown Activation',      recTag: 'start',    tblTags: null,              desc: 'Lockdown Activation request' },
                        { name: 'cmdDeactivatePc', label: 'Lockdown Deactivation PC', recTag: 'stop_pc',  tblTags: vm.objCmdActDeact, desc: 'Lockdown Deactivation request from PC' },
                        { name: 'cmdActivatePc',   label: 'Lockdown Activation PC',   recTag: 'start_pc', tblTags: vm.objCmdActDeact, desc: 'Lockdown Activation request from PC' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
