(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_AC
	app.controller('ObjTypeCtrl_Ac', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'optFailDelay', label: 'Option Fail delay',    tagName: 'word0', numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short delay_fail',    desc: 'Primary power - Options - Fail delay (min)' },
			{ name: 'optRestDelay', label: 'Option Restore delay', tagName: 'word1', numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short delay_restore', desc: 'Primary power - Options - Restore delay (min)' }
		];

        vm.objRecAdc = [
            { name: 'adcVolt', label: 'Adc Volt Value', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwAcAdcCalib.adc.v', desc: 'Primary power - Adc Volt Value' }
        ];

        vm.objEvt = [
            { id: 0, desc: 'AC - Trouble new' },
            { id: 1, desc: 'AC - Trouble restored' },
            { id: 2, desc: 'AC - Failure new' },
            { id: 3, desc: 'AC - Failure restored' },
            { id: 4, desc: 'AC - Adc aquisition ends'}
        ];

		vm.objType = {
			name: 'AC',
			objTypeTag: 'ac',
			desc: 'Object type AC',
			objTypeId: 44,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'adc',    label: 'AdcValue ',     recTag: 'adc',      tblTags: vm.objRecAdc,       desc: 'Object Adc Volt Value' }],
            objCmdTbl:  [{ name: 'adc',   label: 'StartAdc',      recTag: 'adc',      tblTags: null,               desc: 'Start Adc average - 10 samples' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
