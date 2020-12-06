(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_LEARNING_MODE
	app.controller('ObjTypeCtrl_LearnMode', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',      tagName: 'obj_status', numItem: 1, size: 1, disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',              tagName: 'valid',      numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',          tagName: 'ro',         numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',  tagName: 'protect',    numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'inputSerial',     label: 'Input serial',       tagName: 'serial2',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long input.serial',     desc: 'Reader info - serial' },
			{ name: 'inputId',         label: 'Input id',           tagName: 'byte3',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char input.id',         desc: 'Reader info - id' },
			{ name: 'activationSec',   label: 'Activation (sec)',   tagName: 'dword4',     numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long activation_sec',   desc: 'Detection delay (sec)' },
			{ name: 'reactivationSec', label: 'Reactivation (sec)', tagName: 'dword5',     numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long reactivation_sec', desc: 'Detection delay after first detection (sec)' }
		];

		vm.objCmdLearnAddDel = [
			{ name: 'mediaId',    label: 'Media id',             tagName: 'byte0',    numItem: 1, size: 1,  disp: 'basic', c_code: 'char media_id',             desc: 'media: 0=none; 1=rex; 2=card; 3=user code; 4=card and pin' },
			{ name: 'cardLow',    label: 'Card low',             tagName: 'hexv1',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long card.low',    desc: '' },
			{ name: 'cardHigh',   label: 'Card high',            tagName: 'hexv2',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long card.high',   desc: '' },
			{ name: 'code',       label: 'Code',                 tagName: 'hexv3',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long code',        desc: '' },
			{ name: 'objType',    label: 'Object type',          tagName: 'word4',    numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short obj_type',   desc: '' },
			{ name: 'objSerial',  label: 'Object serial number', tagName: 'serial5',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long obj_serial',  desc: '' },
			{ name: 'objId',      label: 'Object id',            tagName: 'dword6',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long obj_id',      desc: '' },
			{ name: 'cardFormat', label: 'Card format',          tagName: 'byte7',    numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char card_format', desc: '' },
			{ name: 'userId',     label: 'User id',              tagName: 'dword8',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_id',     desc: '' },
			{ name: 'userGuid',   label: 'User GUID',            tagName: 'guid9',    numItem: 1, size: 16, disp: 'adv',   c_code: 'char user_guid[16]',        desc: '' },
			{ name: 'doorSerial', label: 'Door serial number',   tagName: 'serial10', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long door_serial', desc: '' },
			{ name: 'doorId',     label: 'Door id',              tagName: 'dword11',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long door_id',     desc: '' },
			{ name: 'sideId',     label: 'Side id',              tagName: 'dword12',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long side_id',     desc: '' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'Learn mode - Enabled by input' },
			{ id: 1, desc: 'Learn mode - Enabled by switch' },
			{ id: 2, desc: 'Learn mode - Disabled' },
			{ id: 3, desc: 'Learn mode - Activated by master card' },
			{ id: 4, desc: 'Learn mode - Ended by master card' },
			{ id: 5, desc: 'Learn mode - Ended by timeout' }
		];

		vm.objType = {
			name: 'Learning Mode',
			objTypeTag: 'learn_mode',
			desc: 'Object type Learning Mode',
			objTypeId: 30,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',       label: 'Configuration', recTag: 'cfg',       tblTags: vm.objRecCfg,         desc: 'Object configuration data' }],
			objCmdTbl: [{ name: 'learn_add',    label: 'Learn add',     recTag: 'learn_add', tblTags: vm.objCmdLearnAddDel, desc: 'Learn mode - add' },
						{ name: 'learn_delete', label: 'Learn delete',  recTag: 'learn_del', tblTags: vm.objCmdLearnAddDel, desc: 'Learn mode - delete' },
						{ name: 'learn_set',    label: 'Learn set',     recTag: 'learn_set', tblTags: vm.objCmdLearnAddDel, desc: 'Learn mode - set' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
