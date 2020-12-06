(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_ELEVATOR
	app.controller('ObjTypeCtrl_Elevator', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',                 label: 'Object Status',                     tagName: 'obj_status', numItem: 1,  size: 1,  disp: 'basic', c_code: 'char obj_status',                               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                     label: 'Valid',                             tagName: 'valid',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',                 desc: 'Entity Flag: Active' },
			{ name: 'readOnly',                  label: 'Read Only',                         tagName: 'ro',         numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                 desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',             label: 'Cannot be deleted',                 tagName: 'protect',    numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                 desc: 'Entity Flag: Protected' },
			{ name: 'label',                     label: 'Display name',                      tagName: 'label2',     numItem: 1,  size: 64, disp: 'basic', c_code: 'L008_Label_ts label',                           desc: 'Label: Display name'},
			{ name: 'optUseDrmMode',             label: 'Option Use DRM Mode',               tagName: 'bit3',       numItem: 1,  size: 1,  disp: 'basic', c_code: 'char option.use_drm_mode : 1',                  desc: ''},
            { name: 'optLockDownEnable',         label: 'Option Lockdown Enable',            tagName: 'bit4',       numItem: 1,  size: 1,  disp: 'basic', c_code: 'char option.b_LockDownEnable : 1',              desc: 'Option - Lockdown Enable'},
            { name: 'optCardAccepted',           label: 'Option Card Accepted',              tagName: 'bit5',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.card_accepted : 1',              desc: ''},
			{ name: 'optCardNeeded',             label: 'Option Card Needed',                tagName: 'bit6',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.card_need_code : 1',             desc: ''},
			{ name: 'optPinAccepted',            label: 'Option Pin Accepted',               tagName: 'bit7',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.pin_accepted : 1',               desc: ''},
			{ name: 'optCardAndPinNeeded',       label: 'Option Card And Pin Needed',        tagName: 'bit8',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.card_and_pin_needed : 1',        desc: ''},
			{ name: 'optDualNeeded',             label: 'Option Dual Needed',                tagName: 'bit9',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.dual_needed : 1',                desc: ''},
			{ name: 'optBioAccepted',            label: 'Option Bio Accepted',               tagName: 'bit10',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.bio_accepted : 1',               desc: ''},
			{ name: 'optDualUserNeedSup',        label: 'Option Dual User Need Sup',         tagName: 'bit11',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.dual_user_need_sup : 1',         desc: ''},
			{ name: 'optDualSupNeedSup',         label: 'Option Dual Sup Need Sup',          tagName: 'bit12',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.dual_sup_need_sup : 1',          desc: ''},
			{ name: 'optDualBothAccessing',      label: 'Option Dual Both Accessing',        tagName: 'bit13',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.dual_both_accessing : 1',        desc: ''},
            { name: 'optDualDisableWhenSuperIn', label: 'Option Dual Disable When Super In', tagName: 'bit14',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'short security.dual_disable_when_super_in : 1', desc: ''},
            { name: 'optDecCardPinCnt',          label: 'Option Decrement Card/PIN counter', tagName: 'bit15',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'short security.decrement_card_pin_counter : 1', desc: 'Will decrement card/pin status counter upon access granted'},
			{ name: 'relayActivationTime',       label: 'Relay Activation Time',             tagName: 'word16',     numItem: 1,  size: 2,  disp: 'adv',   c_code: 'unsigned short relay_activation_time',          desc: ''},
			{ name: 'readerSerial',              label: 'Reader Serial',                     tagName: 'serial17',   numItem: 1,  size: 4,  disp: 'basic', c_code: 'unsigned long reader.obj_serial',               desc: 'Reader serial number'},
			{ name: 'readerId',                  label: 'Reader Id',                         tagName: 'byte18',     numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char reader.obj_id',                   desc: 'Reader id'},
			{ name: 'floorEnabled',              label: 'Floor Enabled',                     tagName: 'bit19',      numItem: 64, size: 1,  disp: 'basic', c_code: 'char option.floor_enabled : 1',                 desc: ''},
			{ name: 'inputSerial',               label: 'Input Serial',                      tagName: 'serial21',   numItem: 64, size: 4,  disp: 'basic', c_code: 'unsigned long input_serial',                    desc: 'drm input'},
			{ name: 'inputId',                   label: 'Input Id',                          tagName: 'byte22',     numItem: 64, size: 1,  disp: 'basic', c_code: 'unsigned char input_id',                        desc: ''},
			{ name: 'relaySerial',               label: 'Relay Serial',                      tagName: 'serial23',   numItem: 64, size: 4,  disp: 'basic', c_code: 'unsigned long relay_serial',                    desc: 'relay'},
			{ name: 'relayId',                   label: 'Relay Id',                          tagName: 'byte24',     numItem: 64, size: 1,  disp: 'basic', c_code: 'unsigned char relay_id',                        desc: ''},
			{ name: 'floorId',                   label: 'Floor Id',                          tagName: 'byte25',     numItem: 64, size: 1,  disp: 'basic', c_code: 'unsigned char floor_id',                        desc: 'floor'},
			{ name: 'areaSerial',                label: 'Area Serial',                       tagName: 'serial26',   numItem: 1,  size: 4,  disp: 'basic', c_code: 'unsigned long area.obj_serial',                 desc: 'Elevator area Serial'},
            { name: 'areaId',                    label: 'Area Id',                           tagName: 'byte27',     numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char area.obj_id',                     desc: 'elevator area id'},
            { name: 'cntToDec',                  label: 'Count to decrement',                tagName: 'dword28',    numItem: 1,  size: 4,  disp: 'basic', c_code: 'unsigned long CountToDec',                      desc: 'Variable number of credits to decrement by this door side (when decrement_card_pin_counter is set)'}
		];

		vm.objCmdElevatorLock = [
			{  name: 'lockTimeout', label: 'Lock timeout', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long timeout_sec',  desc: 'Lock timeout (in sec)' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'Elevator - Access denied'        },
			{ id: 1, desc: 'Elevator - Access granted'       },
			{ id: 2, desc: 'Elevator - Floor selection'      },
            { id: 3, desc: 'Elevator - Selection activated'  },
            { id: 4, desc: 'Elevator - Lockdown activated'   },
            { id: 5, desc: 'Elevator - Lockdown deactivated' },
            { id: 6, desc: 'Elevator - Lockdown override'    }
		];

		vm.objType = {
			name: 'Elevator',
			objTypeTag: 'elevator',
			desc: 'Object type Elevator',
			objTypeId: 81,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 2,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: [{ name: 'unlock',  label: 'Unlock elevator',    recTag: 'unlock',   tblTags: vm.objCmdElevatorLock,  desc: 'Elevator unlock request' },
                        // { name: 'lock',    label: 'Lock elevator',      recTag: 'lock',     tblTags: vm.objCmdElevatorLock,  desc: 'Elevator lock request' },
                        // { name: 'enable',  label: 'Enable', 	        recTag: 'enable',   tblTags: null,                   desc: 'Enable' },
                        // { name: 'disable', label: 'Disable', 	        recTag: 'disable',  tblTags: null,                   desc: 'Disable' },
                        // { name: 'reset',   label: 'Reset', 		        recTag: 'reset',    tblTags: null,                   desc: 'Reset' },
                        { name: 'override',label: 'Lockdown override', 	recTag: 'override', tblTags: vm.objCmdElevatorLock,  desc: 'Lockdown override' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
