(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_OUTPUT
	app.controller('ObjTypeCtrl_Output', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus', 	    label: 'Object Status', 	tagName: 'obj_status', 	numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status', 			   desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid', 			label: 'Valid', 			tagName: 'valid', 		numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly', 		label: 'Read Only', 		tagName: 'ro', 			numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',  	label: 'Cannot be deleted', tagName: 'protect',   	numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'label', 			label: 'Display name',		tagName: 'label2',  	numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]', 				   desc: 'Label: Display name' },
 			{ name: 'activationDelay',  label: 'Activation Delay',  tagName: 'dword3',  	numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long activation_delay', desc: 'Minimum delay between activation' },
 			{ name: 'normallyOpen', 	label: 'Normally open', 	tagName: 'bit4', 		numItem: 1, size: 1,  disp: 'basic', c_code: 'char option.NO:1', 			   desc: 'Reversed logic: 0=Normally close; 1=Normally Open' }
			];

		vm.objRecStatus = [
			{ name: 'status', label: 'Status', tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'char status', desc: 'Status of the relay: 0=off; 1=on' },
			];

		vm.objCmdCustom = [
			{ name: 'numPrePause', 			label: 'Number of pre-pause', 		 tagName: 'word0',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pre_pause_nb',			desc: 'Number of pre pause' },
 			{ name: 'pwmValPeriod1', 		label: 'PWM value period 1', 		 tagName: 'word1',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_period_1_value',	desc: 'PWM value - period 1' },
 			{ name: 'pwmPeriod1', 			label: 'PWM period 1', 				 tagName: 'word2',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_period_1',			desc: 'PWM period 1' },
 			{ name: 'pwmPeriod2', 			label: 'PWM period 2', 				 tagName: 'word3',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_period_2',			desc: 'PWM period 2' },
 			{ name: 'numRepetitionPwm', 	label: 'Number of repetition PWM', 	 tagName: 'word4',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pwm_nb_repetition',	desc: 'Number of repetition PWM sequence' },
 			{ name: 'numPause', 			label: 'Number of pause', 			 tagName: 'word5',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short pause_nb',				desc: 'Number of pause' },
 			{ name: 'numRepetitionTotal', 	label: 'Number of repetition total', tagName: 'word6',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short repeat_nb',			desc: 'Number of total repetition' }
			];

		vm.objEvt = [
			{ id: 0, desc: 'Output - Latch off' },
			{ id: 1, desc: 'Output - Latch on' },
			{ id: 2, desc: 'Output - Latch flash' }
		];

		vm.objType = {
			name: 'Output',
			objTypeTag: 'output',
			desc: 'Object type Output',
			objTypeId: 0,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 8,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'status', label: 'Status', 		  recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' }],
			objCmdTbl: [{ name: 'on',     label: 'Output on', 	  recTag: 'on',       tblTags: null,               desc: 'Activate relay - latch' },
						{ name: 'off',    label: 'Output off', 	  recTag: 'off',      tblTags: null,               desc: 'Deactivate relay - latch' },
						{ name: 'custom', label: 'Custom', 		  recTag: 'custom',   tblTags: vm.objCmdCustom ,   desc: 'Custom activation' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
