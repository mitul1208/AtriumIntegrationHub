(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_DOOR_LOCK
	app.controller('ObjTypeCtrl_DoorLock', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',        tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',                tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',            tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',    tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'label',           label: 'Display name',         tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                 desc: 'Label: Display name' },
			{ name: 'activationDelay', label: 'Activation delay',     tagName: 'dword3',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long activation_delay', desc: 'Minimum delay between activation' },
			{ name: 'optNormOpen',     label: 'Option Normally open', tagName: 'bit4',       numItem: 1, size: 1,  disp: 'basic', c_code: 'char option.NO:1',               desc: 'Reversed logic: 0=Normally close; 1=Normally Open' },
			{ name: 'optIsPowered',    label: 'Option Is powered',    tagName: 'bit5',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'char option.is_powered:1',       desc: '' },
			{ name: 'optIsRelay',      label: 'Option Is relay',      tagName: 'bit6',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'char option.is_relay:1',         desc: '' },
			{ name: 'vlockSerial',     label: 'Vlock serial',         tagName: 'serial7',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long vlock.serial',     desc: 'VLock info - serial' },
			{ name: 'vlockId',         label: 'Vlock id',             tagName: 'byte8',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char vlock.id',         desc: 'VLock info - id' },
			{ name: 'vlockDelay',      label: 'Vlock delay',          tagName: 'word9',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short vlock_delay',     desc: 'VLock activation delay (sec)' },
			{ name: 'relaySerial',     label: 'Relay serial',         tagName: 'serial10',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long relay.serial',     desc: 'Relay info - serial' },
			{ name: 'relayId',         label: 'Relay id',             tagName: 'byte11',     numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char relay.id',         desc: 'Relay info - id' },
			{ name: 'relayDelay',      label: 'Relay delay',          tagName: 'word12',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short relay_delay',     desc: 'Relay activation delay (sec)' }
		];

		vm.objRecTrbl = [
			{ name: 'optPullstation', label: 'Option pullstation', tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short bit.pullstation:1', desc: '' },
			{ name: 'optVlock',       label: 'Option vlock',       tagName: 'bit1',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short bit.vlock:1',       desc: '' },
			{ name: 'timestampUTC',   label: 'Timestamp UTC',      tagName: 'utc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',      desc: '' },
			{ name: 'timestampLocal', label: 'Timestamp local',    tagName: 'loc_time3', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL',    desc: '' }
		];

		vm.objRecStatus = [
			{ name: 'lock', label: 'Lock',    tagName: 'byte0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char lock', desc: '' },
			{ name: 'v',    label: 'Volt',    tagName: 'dword1', numItem: 1, size: 4, disp: 'adv',   c_code: 'long v',    desc: '' },
			{ name: 'i',    label: 'Current', tagName: 'dword2', numItem: 1, size: 4, disp: 'adv',   c_code: 'long i',    desc: '' }
		];

		vm.objRecPriv = [
			{ name: 'battM',     label: 'Battery m',      tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long batt.m',        desc: '' },
			{ name: 'battN',     label: 'Battery n',      tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'long batt.n',        desc: '' },
			{ name: 'battC',     label: 'Battery c',      tagName: 'dword2', numItem: 1, size: 4, disp: 'basic', c_code: 'long batt.c',        desc: '' },
			{ name: 'acM',       label: 'AC m', 		  tagName: 'dword3', numItem: 1, size: 4, disp: 'basic', c_code: 'long ac.m',          desc: '' },
			{ name: 'acB',       label: 'AC b', 		  tagName: 'dword4', numItem: 1, size: 4, disp: 'basic', c_code: 'long ac.b',          desc: '' },
			{ name: 'vlockAdj0', label: 'VLock adjust 0', tagName: 'bit5',   numItem: 1, size: 1, disp: 'adv',   c_code: 'char vlk_adjust0:1', desc: '' },
			{ name: 'vlockAdj1', label: 'VLock adjust 1', tagName: 'bit6',   numItem: 1, size: 1, disp: 'adv',   c_code: 'char vlk_adjust1:1', desc: '' }
		];

        vm.objRecAdc = [ 
            { name: 'adcVolt', label: 'Adc Volt Value', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwVlockAdcCalib.adc.v', desc: 'Door Lock - Adc Volt Value' }, 
            { name: 'adcAmp',  label: 'Adc Amp Value',  tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwVlockAdcCalib.adc.i', desc: 'Door Lock - Adc Amp Value' } 
        ]; 

		vm.objCmdCustom = [
			{ name: 'numPrePause', 			label: 'Number of pre-pause', 		 tagName: 'word0',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pre_pause_nb',		 desc: 'Number of pre pause' },
 			{ name: 'pwmValPeriod1', 		label: 'PWM value period 1', 		 tagName: 'word1',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_period_1_value', desc: 'PWM value - period 1' },
 			{ name: 'pwmPeriod1', 			label: 'PWM period 1', 				 tagName: 'word2',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_period_1',		 desc: 'PWM period 1' },
 			{ name: 'pwmPeriod2', 			label: 'PWM period 2', 				 tagName: 'word3',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_period_2',		 desc: 'PWM period 2' },
 			{ name: 'numRepetitionPwm', 	label: 'Number of repetition PWM', 	 tagName: 'word4',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_nb_repetition',	 desc: 'Number of repetition PWM sequence' },
 			{ name: 'numPause', 			label: 'Number of pause', 			 tagName: 'word5',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pause_nb',			 desc: 'Number of pause' },
 			{ name: 'numRepetitionTotal', 	label: 'Number of repetition total', tagName: 'word6',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short repeat_nb',			 desc: 'Number of total repetition' }
			];

        vm.objEvt = [
            { id: 0, desc: 'Door lock - Latch off' },
            { id: 1, desc: 'Door lock - Latch on' },
            { id: 2, desc: 'Door lock - Latch flash' },
            { id: 3, desc: 'Door lock - Trouble new' },
            { id: 4, desc: 'Door lock - Trouble restored' },
            { id: 5, desc: 'Door lock - Latch pull station off' },
            { id: 6, desc: 'Door lock - Latch pull station on' },
            { id: 7, desc: 'Door Lock - Adc aquisition ends'}
        ];

		vm.objType = {
			name: 'Door Lock',
			objTypeTag: 'door_lock',
			desc: 'Object type Door Lock',
			objTypeId: 37,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 10,
			objRecTbl: [{ name: 'config',   label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble',  label: 'Trouble', 	    recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',   label: 'Status', 		recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' },
						{ name: 'private',  label: 'Private', 		recTag: 'private',  tblTags: vm.objRecPriv,      desc: 'Object private data' },
                        { name: 'adc',      label: 'Adc',           recTag: 'adc',      tblTags: vm.objRecAdc,       desc: 'Object adc data' }],
			objCmdTbl: [{ name: 'on',       label: 'Door lock On',  recTag: 'on',       tblTags: null,               desc: 'Activate relay - latch' },
						{ name: 'off',      label: 'Door lock Off', recTag: 'off',      tblTags: null,               desc: 'Deactivate relay - latch' },
						{ name: 'custom',   label: 'Custom', 		recTag: 'custom',   tblTags: vm.objCmdCustom,    desc: 'Custom activation' },
						{ name: 'local',    label: 'Local events',  recTag: 'local',    tblTags: null,               desc: 'Set object events destination to remain local' },
						{ name: 'global',   label: 'Global events', recTag: 'global',   tblTags: null,               desc: 'Set object events destination to be forwarded to the global serial number' },
                        { name: 'adc',      label: 'StartAdc',      recTag: 'adc',      tblTags: null,               desc: 'Start Adc average - 10 samples' }], 
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};


		$sdkObjTypeSvc.create(vm.objType);
	});

})();
