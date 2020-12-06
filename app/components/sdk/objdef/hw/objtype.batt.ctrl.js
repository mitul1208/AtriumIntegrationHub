(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_BATT
	app.controller('ObjTypeCtrl_Batt', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'valid',         label: 'Valid',                  tagName: 'valid',     numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',              tagName: 'ro',        numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted',      tagName: 'protect',   numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'iBattAdjust',   label: 'Current battery adjust', tagName: 'byte1',     numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char ibat_adjust',     desc: 'Options - Current battery charge: 3=250mA; 2=320mA; 1=500mA; 0=1A' }
		];
		vm.objRecTrbl = [
			{ name: 'trblLow',        label: 'Trouble battery low',     tagName: 'bit0',      numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short bit.low:1',       desc: '' },
			{ name: 'trblMissing',    label: 'Trouble battery missing', tagName: 'bit1',      numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short bit.missing:1',   desc: '' },
			{ name: 'timestampUTC',   label: 'Timestamp UTC',           tagName: 'utc_time3', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long  timestamp_UTC',   desc: '' },
			{ name: 'timestampLocal', label: 'Timestamp local',         tagName: 'loc_time4', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long  timestamp_LOCAL', desc: '' }
		];
		vm.objRecStatus = [
			{ name: 'v',        label: 'Volt',     tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long v',                        desc: '' },
			{ name: 'i',        label: 'Current',  tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'long i',                        desc: '' },
			{ name: 'charging', label: 'Charging', tagName: 'bit2',   numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char flag.charging:1', desc: '' }
		];
		vm.objRecPriv = [
			{ name: 'vBattAdjust0', label: 'Option volt batt adjust 0', tagName: 'bit0',   numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned char vbat_adjust0 : 1', desc: '' },
			{ name: 'vBattAdjust1', label: 'Option volt batt adjust 1', tagName: 'bit1',   numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned char vbat_adjust1 : 1', desc: '' },
			{ name: 'vBattAdjust2', label: 'Option volt batt adjust 2', tagName: 'bit2',   numItem: 1, size: 1, disp: 'adv',   c_code: 'unsigned char vbat_adjust2 : 1', desc: '' },
			{ name: 'vM',           label: 'Volt m',                    tagName: 'dword4', numItem: 1, size: 4, disp: 'basic', c_code: 'long v.m',                       desc: '' },
			{ name: 'vB',           label: 'Volt b',                    tagName: 'dword5', numItem: 1, size: 4, disp: 'basic', c_code: 'long v.b',                       desc: '' },
			{ name: 'iChargeM',     label: 'Current charge m',          tagName: 'dword6', numItem: 4, size: 4, disp: 'adv',   c_code: 'long icharge[].m',               desc: '' },
			{ name: 'iChargeB',     label: 'Current charge b',          tagName: 'dword7', numItem: 4, size: 4, disp: 'adv',   c_code: 'long icharge[].b',               desc: '' }
		];
        vm.objRecIoState = [
            { name: 'battFault',         label: 'Batt Fault',           tagName: 'bit0', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short batt_io_state.batt_fault:1',         desc: 'BATT - IO State - Fault'          },
        ];
        vm.objRecAdc = [
            { name: 'adcVolt', label: 'Adc Volt Value', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwBattCalib.adc.v', desc: 'Battery - Adc Volt Value' },
            { name: 'adcAmp',  label: 'Adc Amp Value',  tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long HwBattCalib.adc.i', desc: 'Battery - Adc Amp Value' }
        ];

        vm.objCmdTest = [
            { name: 'state', label: 'Start/Stop Test', tagName: 'bit0',  numItem: 1, size: 1, disp: 'b', desc: 'Stop (0) or Start (1) test' }
        ];
        vm.objCmdLed = [
            { name: 'greenLed', label: 'Green LED', tagName: 'bit0',  numItem: 1, size: 1, disp: 'b', desc: 'Green LED State' },
            { name: 'redLed',   label: 'Red LED',   tagName: 'bit1',  numItem: 1, size: 1, disp: 'b', desc: 'Red LED State' }
        ];
        vm.objCmdVAdjust = [
            { name: 'vBattAdjust0', label: 'vBatt Adjust 0', tagName: 'bit0',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char batt_private_setting_st.adjust0', desc: 'BATT - Supply Adjust0'},
            { name: 'vBattAdjust1', label: 'vBatt Adjust 1', tagName: 'bit1',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char batt_private_setting_st.adjust1', desc: 'BATT - Supply Adjust1'},
            { name: 'vBattAdjust2', label: 'vBatt Adjust 2', tagName: 'bit2',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char batt_private_setting_st.adjust2', desc: 'BATT - Supply Adjust2'}
        ];
         vm.objCmdIAdjust = [
            { name: 'iBattAdjust0', label: 'iBatt Adjust 0', tagName: 'bit0',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char batt_private_setting_st.adjust0', desc: 'BATT - Supply Adjust0'},
            { name: 'iBattAdjust1', label: 'iBatt Adjust 1', tagName: 'bit1',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char batt_private_setting_st.adjust1', desc: 'BATT - Supply Adjust1'},
            { name: 'iBattAdjust2', label: 'iBatt Adjust 2', tagName: 'bit2',  numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char batt_private_setting_st.adjust2', desc: 'BATT - Supply Adjust2'}
        ];

        vm.objEvt = [
            { id: 0, desc: 'Batt - Low trouble new' },
            { id: 1, desc: 'Batt - Missing trouble new' },
            { id: 2, desc: 'Batt - Low trouble restored' },
            { id: 3, desc: 'Batt - Missing trouble restored' },
            { id: 4, desc: 'Batt - Adc aquisition ends'}
        ];

		vm.objType = {
			name: 'Battery',
			objTypeTag: 'batt',
			desc: 'Object type Battery',
			objTypeId: 42,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config',   label: 'Configuration',        recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
						{ name: 'trouble',  label: 'Trouble', 		       recTag: 'trouble',  tblTags: vm.objRecTrbl,      desc: 'Object trouble data' },
						{ name: 'status',   label: 'Status', 		       recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data' },
						{ name: 'private',  label: 'Private',              recTag: 'private',  tblTags: vm.objRecPriv,      desc: 'Object private data' },
                        { name: 'io',       label: 'Io',                   recTag: 'io',       tblTags: vm.objRecIoState,   desc: 'Object io data' },
                        { name: 'adc',      label: 'Adc',                  recTag: 'adc',      tblTags: vm.objRecAdc,       desc: 'Object adc data' }],
            objCmdTbl: [{ name: 'off',      label: 'Batt off',             recTag: 'off',      tblTags: null,               desc: 'Deactivate batt' },
                        { name: 'on',       label: 'Batt on',              recTag: 'on',       tblTags: null,               desc: 'Activate batt' },
                        { name: 'testState', label: 'Test Batt State set', recTag: 'test',     tblTags: vm.objCmdTest,      desc: 'Activate/Deactivate test batt' },
                        { name: 'ledState',  label: 'Led State set',       recTag: 'led',      tblTags: vm.objCmdLed,       desc: 'Set Battery LED status' },
                        { name: 'vAdjust',  label: 'Volt Adjust',          recTag: 'v_adjust', tblTags: vm.objCmdVAdjust,   desc: 'Volt adjustement' },
                        { name: 'iAdjust',  label: 'Amp Adjust',           recTag: 'i_adjust', tblTags: vm.objCmdIAdjust,   desc: 'Amp adjustement' },
                        { name: 'adc',      label: 'StartAdc',             recTag: 'adc',      tblTags: null,               desc: 'Start Adc average - 10 samples' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
