(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_VLOCK
	app.controller('ObjTypeCtrl_Vlock', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',        tagName: 'obj_status', numItem: 1, size: 1, disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',                tagName: 'valid',      numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',            tagName: 'ro',         numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted',    tagName: 'protect',    numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',         tagName: 'label2',     numItem: 1, size: 1, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'optNormOpen',   label: 'Option normally open', tagName: 'bit3',       numItem: 1, size: 1, disp: 'basic', c_code: 'char option.NO : 1',            desc: 'Reversed logic: 0=Normally close; 1=Normally Open' },
		];

		vm.objRecStatus = [
			{ name: 'status',  label: 'Status',  tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'char status',  desc: ''},
			{ name: 'inverse', label: 'Inverse', tagName: 'byte1', numItem: 1, size: 1, disp: 'basic', c_code: 'char inverse', desc: ''}
		];

		vm.objEvt = [
			{ id: 0, desc: 'VLock - Latch off' },
			{ id: 1, desc: 'VLock - Latch on' },
			{ id: 2, desc: 'VLock - Latch toggle' },
			{ id: 3, desc: 'VLock - Inverse' }
		];

		vm.objType = {
			name: 'VLock',
			objTypeTag: 'vlock',
			desc: 'Object type VLock',
			objTypeId: 77,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 2,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'status',  label: 'Status', 	   recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' }],
			objCmdTbl: [{ name: 'on',      label: 'Vlock on', 	   recTag: 'on',       tblTags: null,               desc: 'Activate vlock - latch' },
						{ name: 'off',     label: 'Vlock off', 	   recTag: 'off',      tblTags: null,               desc: 'Deactivate vlock - latch' },
						{ name: 'toggle',  label: 'Toggle state',  recTag: 'toggle',   tblTags: null,               desc: 'Toggle vlock state - latch' },
						{ name: 'local',   label: 'Local events',  recTag: 'local',    tblTags: null,               desc: 'Set object events destination to remain local' },
						{ name: 'global',  label: 'Global events', recTag: 'global',   tblTags: null,               desc: 'Set object events destination to be forwarded to the global serial number' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
