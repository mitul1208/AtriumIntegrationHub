(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_DOOR
	app.controller('ObjTypeCtrl_Door', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',                 label: 'Object status',                        tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                                                         desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                     label: 'Valid',                                tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',                                           desc: 'Entity Flag: Active' },
			{ name: 'readOnly',                  label: 'Read only',                            tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                                           desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',             label: 'Cannot be deleted',                    tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                                           desc: 'Entity Flag: Protected' },
			{ name: 'label',                     label: 'Display name',                         tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                                                          desc: 'Label: Display name' },
			{ name: 'optCardAccepted',           label: 'Option card accepted',                 tagName: 'bit3',       numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.card_accepted:1',                        desc: 'Unlock options - Card' },
			{ name: 'optCardNeedCode',           label: 'Option card need code',                tagName: 'bit4',       numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.card_need_code:1',                       desc: 'Unlock options - (Card)...and pin' },
			{ name: 'optPinAccepted',            label: 'Option pin accepted',                  tagName: 'bit5',       numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.pin_accepted:1',                         desc: 'Unlock options - Keypad code accepted on this side' },
			{ name: 'optCardAndPinNeeded',       label: 'Option card and pin needed',           tagName: 'bit6',       numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.card_and_pin_needed:1',                  desc: '' },
			{ name: 'optDualNeeded',             label: 'Option dual needed',                   tagName: 'bit7',       numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.dual_needed:1',                          desc: '' },
			{ name: 'optBioAccepted',            label: 'Option bio accepted',                  tagName: 'bit8',       numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.bio_accepted:1',                         desc: '' },
			{ name: 'optDualUserNeedSup',        label: 'Option dual user need sup',            tagName: 'bit9',       numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.dual_user_need_sup:1',                   desc: '' },
			{ name: 'optDualSupNeedSup',         label: 'Option dual sup need sup',             tagName: 'bit10',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.dual_sup_need_sup:1',                    desc: '' },
			{ name: 'optDualBothAccessing',      label: 'Option dual both accessing',           tagName: 'bit11',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.dual_both_accessing:1',                  desc: 'Unlock options - Two man rule' },
			{ name: 'optDualDisableWhenSuperIn', label: 'Option dual disable when super in',    tagName: 'bit12',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.dual_disable_when_super_in:1',           desc: '' },
			{ name: 'optInterlockEnable',        label: 'Option interlock enable',              tagName: 'bit13',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.interlock_enable:1',                     desc: 'Unlock options - Interlock on this side' },
			{ name: 'optUnlockOnRex',            label: 'Option unlock on rex',                 tagName: 'bit14',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.unlock_on_rex:1',                        desc: 'Unlock options - REX' },
			{ name: 'optReadCardOnDoorOpen',     label: 'Option read card on door open',        tagName: 'bit15',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.read_card_on_door_open:1',               desc: '' },
			{ name: 'optReadCardOnDoorUnlock',   label: 'Option read card on door unlock',      tagName: 'bit16',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.read_card_on_door_unlock:1',             desc: '' },
			{ name: 'optOpenLate',               label: 'Option open late',                     tagName: 'bit17',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.open_late:1',                            desc: '' },
			{ name: 'optUseForCardCnt',          label: 'Option use for card count',            tagName: 'bit18',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.use_for_card_count:1',                   desc: '' },
			{ name: 'optUnlockOnRexDoorOpen',    label: 'Option unlock on rex door open',       tagName: 'bit19',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.unlock_on_rex_door_open:1',              desc: 'Unlock options - (REX)... even if door Open' },
			{ name: 'optSmartOpenLate',          label: 'Option smart open late',               tagName: 'bit20',      numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].security.smart_open_late:1',                      desc: '' },
			{ name: 'partitionSerial',           label: 'Partition serial',                     tagName: 'serial21',   numItem: 2, size: 4,  disp: 'basic', c_code: 'door_side_cfg_st side[].partition.serial',                                desc: 'Area info' },
			{ name: 'partitionId',               label: 'Partition id',                         tagName: 'byte22',     numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].partition.id',                                    desc: 'Area info' },
			{ name: 'inputConfirmationSerial',   label: 'Input confirmation serial',            tagName: 'serial23',   numItem: 2, size: 4,  disp: 'adv',   c_code: 'door_side_cfg_st side[].input_confirmation.serial',                       desc: 'Input confirmation info' },
			{ name: 'inputConfirmationId',       label: 'Input confirmation id',                tagName: 'byte24',     numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].input_confirmation.id',                           desc: 'Input confirmation info' },
			{ name: 'inputRexSerial',            label: 'Input rex serial',                     tagName: 'serial25',   numItem: 2, size: 4,  disp: 'basic', c_code: 'door_side_cfg_st side[].input_rex.serial',                                desc: 'REX info' },
			{ name: 'inputRexId',                label: 'Input rex id',                         tagName: 'byte26',     numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].input_rex.id',                                    desc: 'REX info' },
			{ name: 'interlockSerial',           label: 'Interlock serial',                     tagName: 'serial27',   numItem: 2, size: 4,  disp: 'adv',   c_code: 'door_side_cfg_st side[].interlock.serial',                                desc: 'Interlock info' },
			{ name: 'interlockId',               label: 'Interlock id',                         tagName: 'byte28',     numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].interlock.id',                                    desc: 'Interlock info' },
			{ name: 'readerSerial',              label: 'Reader serial',                        tagName: 'serial29',   numItem: 2, size: 4,  disp: 'basic', c_code: 'door_side_cfg_st side[].reader.serial',                                   desc: 'Reader info' },
			{ name: 'readerId',                  label: 'Reader id',                            tagName: 'byte30',     numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].reader.id',                                       desc: 'Reader info' },
			{ name: 'keypadSerial',              label: 'Keypad serial',                        tagName: 'serial31',   numItem: 2, size: 4,  disp: 'adv',   c_code: 'door_side_cfg_st side[].keypad.serial',                                   desc: 'Keypad info (N/U)' },
			{ name: 'keypadId',                  label: 'Keypad id',                            tagName: 'byte32',     numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].keypad.id',                                       desc: 'Keypad info (N/U)' },
			{ name: 'schedRex',                  label: 'Sched rex',                            tagName: 'byte33',     numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].sched_rex',                                       desc: 'REX Schedule id' },
			{ name: 'schedKeypad',               label: 'Sched keypad',                         tagName: 'byte34',     numItem: 2, size: 1,  disp: 'adv',   c_code: 'door_side_cfg_st side[].sched_keypad',                                    desc: 'N/U' },
			{ name: 'schedCode',                 label: 'Sched code',                           tagName: 'byte35',     numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].sched_code',                                      desc: 'Pin Schedule id' },
			{ name: 'optUnlockSchedFirstUser',   label: 'Option unlock schedule on first user', tagName: 'bit36',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'door_option_st option.unlock_sched_on_first_user:1',                      desc: 'Options - Unlocks on first access / First man in' },
			{ name: 'optRelockDoorOpening',      label: 'Option relock door opening',           tagName: 'bit37',      numItem: 1, size: 1,  disp: 'basic', c_code: 'door_option_st option.relock_door_opening:1',                             desc: 'Options - Relock on door open' },
			{ name: 'optRelockDoorClosing',      label: 'Option relock door closing',           tagName: 'bit38',      numItem: 1, size: 1,  disp: 'basic', c_code: 'door_option_st option.relock_door_closing:1',                             desc: 'Options - Relock on door close' },
			{ name: 'optCanLeftOpen',            label: 'Option can left open',                 tagName: 'bit39',      numItem: 1, size: 1,  disp: 'basic', c_code: 'door_option_st option.can_left_open:1',                                   desc: 'Options - Can be left open' },
			{ name: 'optUserMoveOnDoorOpen',     label: 'Option user move on door open',        tagName: 'bit40',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'door_option_st option.user_move_on_door_open:1',                          desc: 'Options - Update user location on (0 = access granted; 1 = door open)' },
			{ name: 'optDualBadgeArmEnable',     label: 'Option dual badge arming enable',      tagName: 'bit41',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'door_option_st option.dual_badge_arming_enable:1',                        desc: 'Options - Dual badge' },
			{ name: 'inputContactSerial',        label: 'Input contact serial',                 tagName: 'serial42',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long input_contact.serial',                                      desc: 'Contact Input info - serial' },
			{ name: 'inputContactId',            label: 'Input contact id',                     tagName: 'byte43',     numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char input_contact.id',                                          desc: 'Contact Input info - id' },
			{ name: 'outputLockSerial',          label: 'Output lock serial',                   tagName: 'serial44',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long output_lock.serial',                                        desc: 'Lock info - serial' },
			{ name: 'outputLockId',              label: 'Output lock id',                       tagName: 'byte45',     numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char output_lock.id',                                            desc: 'Lock info - id' },
			{ name: 'schedUnlock',               label: 'Sched unlock',                         tagName: 'word46',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short sched_unlock',                                             desc: 'Schedule - Unlock schedule id' },
			{ name: 'unlockDly',                 label: 'Unlock delay',                         tagName: 'byte47',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char unlock_dly',                                                desc: 'Timing - Door Lock Relay - Unlock Time (sec)' },
			{ name: 'extendedDly',               label: 'Extended delay',                       tagName: 'byte48',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char extended_dly',                                              desc: 'Timing - Door Lock Relay - Extended Time (sec)' },
			{ name: 'leftOpenDly',               label: 'Left open delay',                      tagName: 'byte49',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char left_open_dly',                                             desc: 'Timing - Open too long alarm - Maximum Time Before Local Alarm (sec)' },
			{ name: 'leftOpenPreAlarmDly',       label: 'Left open pre-alarm delay',            tagName: 'byte50',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char left_open_pre_alarm_dly',                                   desc: 'Timing - Open too long pre-alarm - Delay Before Local Alarm (sec)' },
			{ name: 'dualBadgeTimeout',          label: 'Dual badge timeout delay',             tagName: 'byte51',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char dual_badge_timeout_dly',                                    desc: 'Timing - Max delay between dual badge (sec)' },
			{ name: 'serialOwner',               label: 'Serial owner',                         tagName: 'serial52',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long serial_owner',                                              desc: 'Use for plug and play and delete' },
			{ name: 'cameraSerial',              label: 'Camera serial',                        tagName: 'serial53',   numItem: 2, size: 4,  disp: 'basic', c_code: 'unsigned long camera_id_tbl[].serial',                                    desc: 'Camera info side A and B- serial' },
            { name: 'cameraId',                  label: 'Camera id',                            tagName: 'byte54',     numItem: 2, size: 1,  disp: 'basic', c_code: 'unsigned char camera_id_tbl[].id',                                        desc: 'Camera info side A and B- id' },
            { name: 'vidAccGranted',             label: 'Video Access Granted',                 tagName: 'bit55',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_access_granted:1',             desc: '' },
            { name: 'vidAccDenied',              label: 'Video Access Denied',                  tagName: 'bit56',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_access_denied:1',              desc: '' },
            { name: 'vidDoorUnlock',             label: 'Video Door Unlock',                    tagName: 'bit57',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_unlock:1',                desc: '' },
            { name: 'vidDoorOpen',               label: 'Video Door Open',                      tagName: 'bit58',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_open:1',                  desc: '' },
            { name: 'vidDoorForced',             label: 'Video Door Forced',                    tagName: 'bit59',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_forced:1',                desc: '' },
            { name: 'vidDoorOpenTooLong',        label: 'Video Door Open Too Long',             tagName: 'bit60',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_open_too_long:1',         desc: '' },
            { name: 'vidDoorLock',               label: 'Video Door Lock',                      tagName: 'bit61',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_lock:1',                  desc: '' },
            { name: 'vidDoorClose',              label: 'Video Door Close',                     tagName: 'bit62',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_close:1',                 desc: '' },
            { name: 'vidDoorForceRest',          label: 'Video Door Force Restore',             tagName: 'bit63',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_forced_restore:1',        desc: '' },
            { name: 'vidDoorOpenTooLongRest',    label: 'Video Door Open Too Long Restore',     tagName: 'bit64',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_open_too_long_restore:1', desc: '' },
            { name: 'vidDoorTrbl',               label: 'Video Door Trouble',                   tagName: 'bit65',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_trouble:1',               desc: '' },
            { name: 'vidDoorTrblRest',           label: 'Video Door Trouble Restore',           tagName: 'bit66',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.video_for_door_trouble_restore:1',       desc: '' },
            { name: 'lockdownEnable',            label: 'Lockdown Enable',                      tagName: 'bit67',      numItem: 1, size: 1,  disp: 'basic', c_code: 'door_option_st   option.b_LockDownEnable:1',                              desc: 'Options - Lock Down: When enabled, the entity is part of the Lock Down' },
            { name: 'optDecCardPinCnt',          label: 'Option Decrement Card/PIN counter',    tagName: 'bit68',      numItem: 2, size: 1,  disp: 'basic', c_code: 'door_side_cfg_st side[].security.decrement_card_pin_counter:1',           desc: 'Will decrement card/pin status counter upon access granted'}
        ];

		vm.objRecCfg2 = [
            { name: 'decCntVal',                 label: 'Decrement Count Value',                tagName: 'dword0',     numItem: 2, size: 4,  disp: 'basic', c_code: 'unsigned long CountDec',                                                  desc: 'Variable number of credits to decrement by this door side (when decrement_card_pin_counter is set)' }
        ];

		vm.objRecStatus = [
			{ name: 'doorStatus',       label: 'Door status',        tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'char door_status',        desc: 'door_status_e: 0=unknown; 1=open; 2=close; 3=open pre-alarm; 4=open forced; 5=open too long; 6=lost com trouble' },
			{ name: 'lockStatus',       label: 'Lock status',        tagName: 'byte1', numItem: 1, size: 1, disp: 'basic', c_code: 'char lock_status',        desc: 'door lock status: 0=unknown; 1=locked; 2=locked by user; 3=unlocked; 4=unlocked by user; 6=offline' },
			{ name: 'accessLockStatus', label: 'Access lock status', tagName: 'byte2', numItem: 1, size: 1, disp: 'basic', c_code: 'char access_lock_status', desc: 'door lock status: 0=unknown; 1=locked; 2=locked by user; 3=unlocked; 4=unlocked by user; 6=offline' },
			{ name: 'accessStatus',     label: 'Access status',      tagName: 'byte3', numItem: 1, size: 1, disp: 'adv',   c_code: 'char access_status',      desc: '' },
			{ name: 'bypassStatus',     label: 'Bypass status',      tagName: 'byte4', numItem: 1, size: 1, disp: 'adv',   c_code: 'char bypass_status',      desc: '' },
			{ name: 'vlockStatus',      label: 'Vlock status',       tagName: 'byte5', numItem: 1, size: 1, disp: 'adv',   c_code: 'char vlock_status',       desc: '' }
		];

		vm.objCmdDoorLock = [
			{  name: 'lockTimeout', label: 'Lock timeout', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long timeout_sec',  desc: 'Lock timeout (in sec)' }
		];

		vm.objCmdDoorLearnModeCardSet = [
			{ name: 'doorSide',   label: 'Door Side',   tagName: 'byte0',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char side',        desc: 'door side' },
			{ name: 'userId',     label: 'User id',     tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long user_number', desc: 'Reference in USER Table' },
			{ name: 'cardFamily', label: 'Card Family', tagName: 'byte2',  numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned char card_family', desc: 'Card Family to learn' },
		];

		vm.objEvt = [
			{ id: 0,  desc: 'Door - Unlock' },
			{ id: 1,  desc: 'Door - Lock' },
			{ id: 2,  desc: 'Door - Open' },
			{ id: 3,  desc: 'Door - Close' },
			{ id: 4,  desc: 'Door - Pre-alarm' },
			{ id: 5,  desc: 'Door - Alarm' },
			{ id: 6,  desc: 'Door - Forced' },
			{ id: 7,  desc: 'Door - Trouble new' },
			{ id: 8,  desc: 'Door - Trouble restored' },
			{ id: 9,  desc: 'Door - Alarm restored' },
			{ id: 10, desc: 'Door - Pre-alarm restored' },
			{ id: 11, desc: 'Door - Forced restored' },
			{ id: 12, desc: 'Door - Access enabled' },
			{ id: 13, desc: 'Door - Access disabled' },
			{ id: 14, desc: 'Door - Reset by user' },
			{ id: 15, desc: 'Door - User has enter system' },
			{ id: 16, desc: 'Door - User has exit system' },
			{ id: 17, desc: 'Door - Unlock for access' },
			{ id: 18, desc: 'Door - Lock after access' },
			{ id: 21, desc: 'Door - Pull station enabled' },
			{ id: 22, desc: 'Door - Pull station disabled' },
			{ id: 23, desc: 'Door - VLock trouble new' },
			{ id: 24, desc: 'Door - VLock trouble restored' },
			{ id: 25, desc: 'Door - Lock offline' },
			{ id: 26, desc: 'Door - Lock online' },
			{ id: 27, desc: 'Door - First man activated' },
            { id: 28, desc: 'Door - First man reset' },
            { id: 29, desc: 'Door - PIN missing' },
            { id: 30, desc: 'Door - Lockdown activated' },
            { id: 31, desc: 'Door - Lockdown deactivated' },
            { id: 32, desc: 'Door - Lockdown override' },
            { id: 33, desc: 'Door - Double swipe' }
		];

		vm.objType = {
			name: 'Door',
			objTypeTag: 'door',
			desc: 'Object type Door',
			objTypeId: 4,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 10,
            objRecTbl: [{ name: 'config',  label: 'Configuration',      recTag: 'cfg',      tblTags: vm.objRecCfg,                  desc: 'Object configuration data' },
                        { name: 'config2', label: 'Configuration 2',    recTag: 'cfg2',     tblTags: vm.objRecCfg2,                 desc: 'Object configuration data 2' },
						{ name: 'status',  label: 'Status',             recTag: 'status',   tblTags: vm.objRecStatus,               desc: 'Object status data' }],
			objCmdTbl: [{ name: 'unlock',  label: 'Unlock door',        recTag: 'unlock',   tblTags: vm.objCmdDoorLock,             desc: 'Door unlock request' },
						{ name: 'lock',    label: 'Lock door', 	        recTag: 'lock',     tblTags: vm.objCmdDoorLock,             desc: 'Door lock request' },
						{ name: 'enable',  label: 'Enable',             recTag: 'enable',   tblTags: null,                          desc: 'Enable' },
						{ name: 'disable', label: 'Disable',            recTag: 'disable',  tblTags: null,                          desc: 'Disable' },
                        { name: 'reset',   label: 'Reset',              recTag: 'reset',    tblTags: null,                          desc: 'Reset' },
                        { name: 'override',label: 'Lockdown override',  recTag: 'override', tblTags: vm.objCmdDoorLock,             desc: 'Lockdown override' },
                        { name: 'card set',label: 'Learn mode card set',recTag: 'learn_set',tblTags: vm.objCmdDoorLearnModeCardSet, desc: 'Learning mode card set' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
            };


		$sdkObjTypeSvc.create(vm.objType);
	});

})();
