(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_AUX
	app.controller('ObjTypeCtrl_Aux', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' }
		];

		vm.objRecTrbl = [
			{ name: 'trblStatus',     label: 'Trouble status',  tagName: 'bit0',      numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short bit.trouble:1',  desc: ''},
			{ name: 'timestampUTC',   label: 'Timestamp UTC',   tagName: 'utc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_UTC',   desc: ''},
			{ name: 'timestampLocal', label: 'Timestamp local', tagName: 'loc_time3', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long timestamp_LOCAL', desc: ''}
		];

		vm.objRecStatus = [
			{ name: 'v', label: 'Volt',    tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long v', desc: ''},
			{ name: 'i', label: 'Current', tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'long i', desc: ''}
		];

		vm.objRecPriv = [
			{ name: 'battM', label: 'Batt m', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long batt.m', desc: '' },
			{ name: 'battN', label: 'Batt n', tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'long batt.n', desc: '' },
			{ name: 'battC', label: 'Batt c', tagName: 'dword2', numItem: 1, size: 4, disp: 'basic', c_code: 'long batt.c', desc: '' },
			{ name: 'acM',   label: 'AC m',   tagName: 'dword3', numItem: 1, size: 4, disp: 'basic', c_code: 'long ac.m',   desc: '' },
			{ name: 'acB',   label: 'AC b',   tagName: 'dword4', numItem: 1, size: 4, disp: 'basic', c_code: 'long ac.b',   desc: '' }
		];
               
        vm.objRecAdc = [
            { name: 'adcVolt', label: 'Adc Volt Value', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwAuxAdcCalib.adc.v', desc: 'Aux - Adc Volt Value' },
            { name: 'adcAmp',  label: 'Adc Amp Value',  tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwAuxAdcCalib.adc.i', desc: 'Aux - Adc Amp Value' }
                ];

        vm.objEvt = [
            { id: 0, desc: 'Aux - Trouble new' },
            { id: 1, desc: 'Aux - Trouble restored' },
            { id: 2, desc: 'Aux - Adc aquisition ends'}
        ];

		vm.objType = {
			name: 'AUX',
			objTypeTag: 'aux',
			desc: 'Object type Aux',
			objTypeId: 43,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,    desc: 'Object configuration data' },
						{ name: 'trouble', label: 'Trouble', 	   recTag: 'trouble',  tblTags: vm.objRecTrbl,   desc: 'Object trouble data' },
						{ name: 'status',  label: 'Status', 	   recTag: 'status',   tblTags: vm.objRecStatus, desc: 'Object status data' },
						{ name: 'private', label: 'Private', 	   recTag: 'private',  tblTags: vm.objRecPriv,   desc: 'Object private data' },
                        { name: 'adc',     label: 'Adc',           recTag: 'adc',      tblTags: vm.objRecAdc,    desc: 'Object adc data' }],
            objCmdTbl: [{ name: 'off',     label: 'Aux off',       recTag: 'off',      tblTags: null,            desc: 'Deactivate aux' },
                        { name: 'on',      label: 'Aux on',        recTag: 'on',       tblTags: null,            desc: 'Activate aux' },
                        { name: 'adc',     label: 'StartAdc',      recTag: 'adc',      tblTags: null,            desc: 'Start Adc average - 10 samples' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
