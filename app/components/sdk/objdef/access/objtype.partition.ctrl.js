(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_PARTITION
	app.controller('ObjTypeCtrl_Partition', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',             label: 'Object status',                   tagName: 'obj_status',  numItem: 1,  size: 1,  disp: 'basic', c_code: 'char obj_status',                           desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                 label: 'Valid',                           tagName: 'valid',       numItem: 1,  size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',             desc: 'Entity Flag: Active' },
			{ name: 'readOnly',              label: 'Read only',                       tagName: 'ro',          numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',             desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',         label: 'Cannot be deleted',               tagName: 'protect',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',             desc: 'Entity Flag: Protected' },
			{ name: 'label',                 label: 'Display name',                    tagName: 'label2',      numItem: 1,  size: 64, disp: 'basic', c_code: 'char label[64]',                            desc: 'Label: Display name' },
			{ name: 'optAntiPbackSupported', label: 'Option anti-passback supported',  tagName: 'bit26',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.antipassback_supported:1',      desc: 'Anti-passback - Supported' },
			{ name: 'optAntiPbackActive',    label: 'Option anti-passback active',     tagName: 'bit27',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.antipassback_enable:1',         desc: 'Anti-passback - Active' },
            { name: 'optAntiPbackType',      label: 'Option anti-passback type',       tagName: 'bit28',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.antipassback_mode:1',           desc: 'Anti-passback - Type: 0=soft anti-passback; 1=hard anti-passback' },
            { name: 'optAntiPbackLocalArea', label: 'Option anti-passback local area', tagName: 'bit29',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.antipassback_local_area:1',     desc: 'Anti-passback - Local area' },
			{ name: 'schedAutoArm',          label: 'Schedule auto-arm',               tagName: 'word34',      numItem: 1,  size: 2,  disp: 'adv',   c_code: 'unsigned short sched_autoarm',              desc: '' },
			{ name: 'zonePresent',           label: 'Zone present',                    tagName: 'bit_field75', numItem: 1,  size: 13, disp: 'adv',   c_code: 'char zone_present.zone_bit[13]',            desc: '13 * 8 = 104 Zones' },
			{ name: 'doorSerial',            label: 'Door serial',                     tagName: 'serial76',    numItem: 10, size: 4,  disp: 'basic', c_code: 'unsigned long door_tbl.serial',             desc: 'Door info of the doors in this partition (up to 10 doors)' },
			{ name: 'doorId',                label: 'Door id',                         tagName: 'byte77',      numItem: 10, size: 1,  disp: 'basic', c_code: 'unsigned char door_tbl.id',                 desc: 'Door info of the doors in this partition (up to 10 doors)' },
			{ name: 'antiPbackSched',        label: 'Anti-passback Schedule',          tagName: 'word82',      numItem: 1,  size: 2,  disp: 'adv',   c_code: 'unsigned short sched_anti_passback',        desc: 'Anti-passback - Schedule' },
			{ name: 'antiPbackDelay',        label: 'Anti-passback delay (min)',       tagName: 'dword83',     numItem: 1,  size: 4,  disp: 'adv',   c_code: 'unsigned long antipassback_timed',          desc: 'Anti-passback - Anti-passback delay (min)' },
            { name: 'antiPbackResetTime',    label: 'Anti-passback Reset time',        tagName: 'dword84',     numItem: 1,  size: 4,  disp: 'adv',   c_code: 'unsigned long locator_reset_time',          desc: 'Anti-passback - Reset time: time of day in sec. 00:00 = midnight' },
            { name: 'vidRecAccGranted',      label: 'Video record access granted',     tagName: 'bit85',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.video_record_access_granted:1', desc: 'Video record access granted' },
            { name: 'vidRecAccDenied',       label: 'Video record access denied',      tagName: 'bit86',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.video_record_access_denied:1',  desc: 'Video record access denied' },
            { name: 'lockdownEnable',        label: 'Lockdown Enable',                 tagName: 'bit87',       numItem: 1,  size: 1,  disp: 'basic', c_code: 'long option.b_LockDownEnable : 1',          desc: 'Lockdown Enable - When enabled, the entity is part of the Lock D' },
            { name: 'optAntiPbackGlobal',    label: 'Option anti-passback global',     tagName: 'bit88',       numItem: 1,  size: 1,  disp: 'adv',   c_code: 'long option.antipassback_global:1',         desc: 'Anti-passback - Global' },
            { name: 'antiPbackSchedReset',   label: 'Anti-passback Schedule Reset',    tagName: 'word89',      numItem: 1,  size: 2,  disp: 'adv',   c_code: 'unsigned short sched_anti_passback_reset',  desc: 'Anti-passback - Schedule reset' }
		];

		vm.objRecStatus = [
			{ name: 'status',               label: 'Status',                      tagName: 'byte0',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char status',                             desc: '' },
			{ name: 'armingMode',           label: 'Arming mode',                 tagName: 'byte1',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'char arming_mode',                                 desc: 'partition arming mode: 0=disarm; 1=arm full; 2=stay; 3=night' },
			{ name: 'armedMedia',           label: 'Armed media',                 tagName: 'byte2',      numItem: 1,  size: 1,  disp: 'adv',   c_code: 'char armed_media',                                 desc: 'partition action by: 0=card; 1=user code; 2=pin; 3=sched; 4=no movement; 5=pc soft; 6=shortcut; 7=rex 8=unknown' },
			{ name: 'armedByUser',          label: 'Armed by user',               tagName: 'dword3',     numItem: 1,  size: 4,  disp: 'adv',   c_code: 'unsigned long armed_by_user',                      desc: '' },
			{ name: 'cardId',               label: 'Card id',                     tagName: 'dword4',     numItem: 1,  size: 4,  disp: 'adv',   c_code: 'unsigned long card_id',                            desc: '' },
			{ name: 'zoneMemory',           label: 'Zone in memory',              tagName: 'bit_field5', numItem: 1,  size: 13, disp: 'adv',   c_code: 'char zone_memory.zone_bit[13]',                    desc: '13 * 8 = 104 Zones' },
			{ name: 'zoneBypassed',         label: 'Zone bypassed',               tagName: 'bit_field6', numItem: 1,  size: 13, disp: 'adv',   c_code: 'char zone_bypassed.zone_bit[13]',                  desc: '13 * 8 = 104 Zones' },
			{ name: 'zoneForced',           label: 'Zone forced',                 tagName: 'bit_field7', numItem: 1,  size: 13, disp: 'adv',   c_code: 'char zone_forced.zone_bit[13]',                    desc: '13 * 8 = 104 Zones' },
			{ name: 'zoneReported',         label: 'Zone reported',               tagName: 'bit_field8', numItem: 1,  size: 13, disp: 'adv',   c_code: 'char zone_not_reported.zone_bit[13]',              desc: '13 * 8 = 104 Zones' },
			{ name: 'cntSuperv',            label: 'Count supervisor',            tagName: 'word9',      numItem: 1,  size: 2,  disp: 'adv',   c_code: 'short count_supervisor',                           desc: '' },
			{ name: 'cntUser',              label: 'Count user',                  tagName: 'word10',     numItem: 1,  size: 2,  disp: 'basic', c_code: 'short count_user',                                 desc: '' },
			{ name: 'tmrWarning',           label: 'Timer warning',               tagName: 'word11',     numItem: 1,  size: 2,  disp: 'adv',   c_code: 'short timer_warning',                              desc: '' },
			{ name: 'tmrAlarm',             label: 'Timer alarm',                 tagName: 'word12',     numItem: 1,  size: 2,  disp: 'adv',   c_code: 'short timer_alarm',                                desc: '' },
			{ name: 'autoZnShutdownCnt',    label: 'Auto zone shutdown counter',  tagName: 'byte13',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'unsigned char auto_shutdown_counter',              desc: '' },
			{ name: 'doorInterlockWaitNum', label: 'Door interlock wait number',  tagName: 'byte14',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'unsigned char door_interlock_wait_number',         desc: '' },
			{ name: 'doorInterlockWaitTbl', label: 'Door interlock wait table',   tagName: 'byte15',     numItem: 10, size: 1,  disp: 'adv',   c_code: 'unsigned char door_interlock_wait_number_tbl[10]', desc: '' },
			{ name: 'interlockBusy',        label: 'Interlock busy',              tagName: 'byte16',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'unsigned char interlock_busy',                     desc: '' },
			{ name: 'autoArmSchedStatus',   label: 'Auto arm schedule status',    tagName: 'byte17',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'char auto_arm_sched_status',                       desc: '0 = off, 1 = on' },
			{ name: 'autoArmNoMoveStatus',  label: 'Auto arm no movement status', tagName: 'byte18',     numItem: 1,  size: 1,  disp: 'adv',   c_code: 'char no_mouvement_sched_status',                   desc: '0 = off, 1 = on' },
			{ name: 'accessStatus',         label: 'Access status',               tagName: 'byte19',     numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char acces_status',                       desc: 'partition access status: 0=normal; 1=anti-passback soft; 2=anti-passback hard; 3=anti-passback soft timed; 4=anti-passback hard timed; 5=need supervisor' }
		];

		vm.objRecCfg2 = [
			{ name: 'valid',                  label: 'Valid',                     tagName: 'valid',     numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',           desc: 'Entity Flag: Active' },
			{ name: 'readOnly',               label: 'Read only',                 tagName: 'ro',        numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',           desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',          label: 'Cannot be deleted',         tagName: 'protect',   numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',           desc: 'Entity Flag: Protected' },
			{ name: 'armStatusInputSerial',   label: 'Arm status input serial',   tagName: 'serial1',   numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long arm_status_input.serial',   desc: '' },
			{ name: 'armStatusInputId',       label: 'Arm status input id',       tagName: 'byte2',     numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char arm_status_input.id',       desc: '' },
			{ name: 'alarmStatusInputSerial', label: 'Alarm status input serial', tagName: 'serial3',   numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long alarm_status_input.serial', desc: '' },
			{ name: 'alarmStatusInputId',     label: 'Alarm status input id',     tagName: 'byte4',     numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char alarm_status_input.id',     desc: '' },
			{ name: 'outputArmingSerial',     label: 'Output arming serial',      tagName: 'serial5',   numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long output_arming.obj_serial',  desc: '' },
			{ name: 'outputArmingType',       label: 'Output arming type',        tagName: 'word6',     numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short output_arming.obj_type',   desc: '' },
			{ name: 'outputArmingId',         label: 'Output arming id',          tagName: 'dword7',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long  output_arming.obj_id',     desc: '' },
			{ name: 'outputType',             label: 'Output type',               tagName: 'byte8',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char output_type',                        desc: 'latch = 0, pulse = 1'},
			{ name: 'outputTime',             label: 'Output time',               tagName: 'word9',     numItem: 1, size: 2, disp: 'adv',   c_code: 'unsigned short output_time',              desc: 'time for pulse'}
		];

		vm.objRecStatus2 = [
			{ name: 'armingInput', label: 'Arming input', tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'char arming_input', desc: '' },
			{ name: 'alarmInput',  label: 'Alarm input',  tagName: 'byte1', numItem: 1, size: 1, disp: 'basic', c_code: 'char alarm_input',  desc: '' }
		];

		vm.objCmdDoorEnter = [
			{ name: 'optDualUserNeedSupervisor',       label: 'Option dual user need supervisor',       tagName: 'bit0',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.dual_user_need_supervisor:1',       desc: '' },
			{ name: 'optDualSupervisorNeedSupervisor', label: 'Option dual supervisor need supervisor', tagName: 'bit1',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.dual_supervisor_need_supervisor:1', desc: '' },
			{ name: 'optDualBothUserIn',               label: 'Option dual both user in',               tagName: 'bit2',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.dual_both_user_in:1',               desc: '' },
			{ name: 'optDualDisableWhenSupervisorIn',  label: 'Option dual disable when supervisor in', tagName: 'bit3',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.dual_disable_when_supervisor_in:1', desc: '' },
			{ name: 'optMedia1Valid',                  label: 'Option media 1 valid',                   tagName: 'bit4',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.media1_valid:1',                    desc: '' },
			{ name: 'optMedia2Valid',                  label: 'Option media 2 valid',                   tagName: 'bit5',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.media2_valid:1',                    desc: '' },
			{ name: 'optDualEnable',                   label: 'Option dual enable',                     tagName: 'bit6',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.dual_enable:1',                     desc: '' },
			{ name: 'optInterlockEnable',              label: 'Option interlock enable',                tagName: 'bit7',     numItem: 1, size: 1, disp: 'adv',   c_code: 'char dual_option.interlock_enable:1',                desc: '' },
			{ name: 'side',                            label: 'Side',                                   tagName: 'byte8',    numItem: 1, size: 1, disp: 'basic', c_code: 'char side',                                          desc: '' },
			{ name: 'unlockDelay',                     label: 'Unlock delay',                           tagName: 'byte9',    numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char unlock_dly',                           desc: '' },
			{ name: 'mediaId',                         label: 'Media id',                               tagName: 'byte10',   numItem: 2, size: 1, disp: 'basic', c_code: 'char media.media_id',                                desc: 'media_e: 0=none; 1=rex; 2=card; 3=user code; 4=card and pin' },
			{ name: 'mediaCardLow',                    label: 'Media card low',                         tagName: 'hexv11',   numItem: 2, size: 4, disp: 'basic', c_code: 'unsigned long media.card.low',                       desc: '' },
			{ name: 'mediaCardHigh',                   label: 'Media card high',                        tagName: 'hexv12',   numItem: 2, size: 4, disp: 'basic', c_code: 'unsigned long media.card.high',                      desc: '' },
			{ name: 'mediaCode',                       label: 'Media code',                             tagName: 'hexv13',   numItem: 2, size: 4, disp: 'basic', c_code: 'unsigned long media.code',                           desc: ''},
			{ name: 'mediaExtraObjType',               label: 'Media extra info object type',           tagName: 'word14',   numItem: 2, size: 2, disp: 'adv',   c_code: 'unsigned short media.extra_info.obj_type',           desc: '' },
			{ name: 'mediaExtraObjSerial',             label: 'Media extra info object serial',         tagName: 'serial15', numItem: 2, size: 4, disp: 'adv',   c_code: 'unsigned long media.extra_info.obj_serial',          desc: '' },
			{ name: 'mediaExtraObjId',                 label: 'Media extra info object id',             tagName: 'dword16',  numItem: 2, size: 4, disp: 'adv',   c_code: 'unsigned long media.extra_info.obj_id',              desc: '' },
			{ name: 'mediaExtraCardFormat',            label: 'Media extra info card format',           tagName: 'byte17',   numItem: 2, size: 1, disp: 'adv',   c_code: 'unsigned char media.extra_info.card_format',         desc: '' },
			{ name: 'interlockState1',                 label: 'Interlock state 1',                      tagName: 'byte18',   numItem: 1, size: 1, disp: 'adv',   c_code: 'char interlock_state_1',                             desc: '0=unused; 1=accept; 2=refuse' },
			{ name: 'interlockState2',                 label: 'Interlock state 2',                      tagName: 'byte19',   numItem: 1, size: 1, disp: 'adv',   c_code: 'char interlock_state_2',                             desc: '0=unused; 1=accept; 2=refuse' },
			{ name: 'doorContactSerial',               label: 'Door contact serial',                    tagName: 'serial20', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long door_contact.serial',                  desc: '' },
            { name: 'doorContactId',                   label: 'Door contact id',                        tagName: 'byte21',   numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char door_contact.id',                      desc: '' },
            { name: 'camRefSerial',                    label: 'Camera ref serial',                      tagName: 'serial22', numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long camera_ref.serial',                    desc: '' },
            { name: 'camRefId',                        label: 'Camera ref id',                          tagName: 'byte23',   numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned char camera_ref.id',                        desc: '' },
            { name: 'camFilterAccGranted',             label: 'Camera filter - Access granted',         tagName: 'bit24',    numItem: 1, size: 1, disp: 'adv',   c_code: 'camera_filter.access_granted:1',                     desc: '' },
            { name: 'camFilterAccDenied',              label: 'Camera filter - Access denied',          tagName: 'bit25',    numItem: 1, size: 1, disp: 'adv',   c_code: 'camera_filter.access_denied:1',                      desc: '' },
            { name: 'optDecCardPinCnt',                label: 'Option Decrement Card/PIN counter',      tagName: 'bit26',    numItem: 1, size: 1, disp: 'adv',   c_code: 'char opt2.decrement_card_pin_counter:1',             desc: 'Will decrement card/pin status counter upon access granted'},
            { name: 'cntToDec',                        label: 'Count to decrement',                     tagName: 'dword27',  numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long CountToDec',                           desc: 'Variable number of credits to decrement by this door side (when decrement_card_pin_counter is set)'}
		];
        vm.objCmdSetCount = [
            { name: 'count',                           label: 'User Count',                             tagName: 'dword0',   numItem: 1, size: 4, disp: 'basic',  c_code: 'unsigned long Count',                               desc: 'User count to affect to the Partition' }
        ];

		vm.objEvt = [
			{ id: 0,  desc: 'Partition - Normal state' },
			{ id: 1,  desc: 'Partition - Entry delay' },
			{ id: 2,  desc: 'Partition - Exit delay' },
			{ id: 3,  desc: 'Partition - Arming delay' },
			{ id: 4,  desc: 'Partition - Alarm intrusion delay' },
			{ id: 5,  desc: 'Partition - Alarm fire delay' },
			{ id: 6,  desc: 'Partition - Confirmation delay' },
			{ id: 7,  desc: 'Partition - Confirmation post-poned delay' },
			{ id: 8,  desc: 'Partition - Access granted' },
			{ id: 9,  desc: 'Partition - Access denied' },
			{ id: 10, desc: 'Partition - Left open' },
			{ id: 11, desc: 'Partition - Crossing set' },
			{ id: 12, desc: 'Partition - Double knock set' },
			{ id: 13, desc: 'Partition - User has enter' },
			{ id: 14, desc: 'Partition - User has exit' },
			{ id: 15, desc: 'Partition - User exit granted' },
			{ id: 16, desc: 'Partition - User exit denied' },
			{ id: 17, desc: 'Partition - User has enter out' },
			{ id: 18, desc: 'Partition - Access normal' },
			{ id: 19, desc: 'Partition - Access anti-passback soft enabled' },
			{ id: 20, desc: 'Partition - Access anti-passback hard enabled' },
			{ id: 21, desc: 'Partition - Access anti-passback soft timed enabled' },
			{ id: 22, desc: 'Partition - Access anti-passback hard timed enabled' },
			{ id: 23, desc: 'Partition - Keyswitch arming' },
			{ id: 24, desc: 'Partition - Keyswitch disarming' },
			{ id: 25, desc: 'Partition - Armed' },
			{ id: 26, desc: 'Partition - Disarmed' },
			{ id: 27, desc: 'Partition - Alarm' },
            { id: 28, desc: 'Partition - Alarm restored' },
            { id: 29, desc: 'Partition - Lockdown activated' },
            { id: 30, desc: 'Partition - Lockdown deactivated' },
            { id: 31, desc: 'Partition - Lockdown partition acknowledge' },
            { id: 32, desc: 'Partition - Lockdown partition override' },
            { id: 33, desc: 'Partition - Lockdown partition de-acknowledge' }
		];

		vm.objType = {
			name: 'Partition',
			objTypeTag: 'partition',
			desc: 'Object type Partition',
			objTypeId: 10,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 10,
			objRecTbl: [{ name: 'config',       label: 'Configuration',            recTag: 'cfg',       tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'status',       label: 'Status',   		           recTag: 'status',    tblTags: vm.objRecStatus,    desc: 'Object status data' },
						{ name: 'config2',      label: 'Configuration 2',          recTag: 'cfg2',      tblTags: vm.objRecCfg2,      desc: 'Object configuration data - extra' },
						{ name: 'status2',      label: 'Status 2',  		       recTag: 'status2',   tblTags: vm.objRecStatus2,   desc: 'Object status data - extra' }],
			objCmdTbl: [{ name: 'enter',        label: 'Enter', 			       recTag: 'enter',     tblTags: vm.objCmdDoorEnter, desc: 'Door enter' },
						{ name: 'arm',          label: 'Arm', 			           recTag: 'arm',       tblTags: null,               desc: 'Arm' },
                        { name: 'disarm',       label: 'Disarm',			       recTag: 'disarm',    tblTags: null,               desc: 'Disarm' },
                        { name: 'lockdownAck',  label: 'Lockdown area secure',     recTag: 'ack',       tblTags: null,               desc: 'Lockdown area secure' },
                        { name: 'lockdownDeAck',label: 'Lockdown area unsecure',   recTag: 'deack',     tblTags: null,               desc: 'Lockdown area unsecure' },
                        { name: 'resetCount',   label: 'Reset user count',         recTag: 'reset',     tblTags: null,               desc: 'Reset user count value' },
                        { name: 'setCount',     label: 'Set user count',           recTag: 'set',       tblTags: vm.objCmdSetCount,  desc: 'Set user count value'   },
                        { name: 'resetLoc',     label: 'Reset area user location', recTag: 'loc_reset', tblTags: null,               desc: 'Reset area user location' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
