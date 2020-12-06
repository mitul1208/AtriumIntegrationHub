(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_READER
	app.controller('ObjTypeCtrl_Reader', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',      label: 'Object status',           tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',          label: 'Valid',                   tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',       label: 'Read only',               tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',  label: 'Cannot be deleted',       tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'label',          label: 'Display name',            tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name' },
			{ name: 'redLedSerial',   label: 'Red LED Serial number',   tagName: 'serial3',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long output.serial',   desc: 'Output info Red LED - Serial number' },
			{ name: 'redLedId',       label: 'Red LED Id',              tagName: 'byte4',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char output.id',       desc: 'Output info Red LED - Id' },
			{ name: 'greenLedSerial', label: 'Green LED Serial number', tagName: 'serial5',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long output.serial',   desc: 'Output info Green LED - Serial number' },
			{ name: 'greenLedId',     label: 'Green LED Id',            tagName: 'byte6',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char output.id',       desc: 'Output info Green LED - Id' },
			{ name: 'buzzerSerial',   label: 'Buzzer Serial number',    tagName: 'serial7',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long output.serial',   desc: 'Output info Buzzer - Serial number' },
			{ name: 'buzzerId',       label: 'Buzzer Id',               tagName: 'byte8',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char output.id',       desc: 'Output info Buzzer - Id' },
			{ name: 'templateId',     label: 'Template id',             tagName: 'byte9',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char template_id',              desc: 'reader template: 0=Generic; 1=CDVI (blue); 2=Digitag-F (Wireless)' },
            { name: 'readerTypeId',   label: 'Reader type id',          tagName: 'byte10',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'char reader_type_id',           desc: 'reader type: 0=normal; 1=schlage' },
            { name: 'readerFormatIn', label: 'Reader format In',        tagName: 'byte11',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'char reader_format_in',         desc: 'Centaur format for reading card' },
            { name: 'keypadFormatIn', label: 'Keypad format In',        tagName: 'byte12',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'char keypad_format_in',         desc: 'Centaur format for keypad' }
		];
        vm.objRecIoState = [
            { name: 'ReaderD0',         label: 'Reader D0',             tagName: 'bit0', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short reader_io_state.reader_D0:1',    desc: 'READER - IO State - D0'          },
            { name: 'ReaderD1',         label: 'Reader D1',             tagName: 'bit1', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short reader_io_state.reader_D1:1',    desc: 'READER - IO State - D1'          }
        ];

		vm.objCmdDisp = [
			{ name: 'template_id',     label: 'template_id',            tagName: 'byte0',  numItem: 1, size: 1, disp: 'basic', c_code: 'char template_id',                     desc: ''},
			{ name: 'nb_second',       label: 'nb_second',              tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long nb_second',              desc: ''},
			{ name: 'offlineMediaId',  label: 'Offline info media id',  tagName: 'byte2',  numItem: 1, size: 1, disp: 'adv',   c_code: 'char offline_info.media_id',           desc: ''},
			{ name: 'offlineCardLow',  label: 'Offline info card low',  tagName: 'hexv3',  numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long offline_info.card.low',  desc: ''},
			{ name: 'offlineCardHigh', label: 'Offline info card high', tagName: 'hexv4',  numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long offline_info.card.high', desc: ''},
			{ name: 'offlineCodeCode', label: 'Offline info code code', tagName: 'hexv5',  numItem: 1, size: 4, disp: 'adv',   c_code: 'unsigned long offline_info.code.code', desc: 'User code'}
        ];
		vm.objCmdLed = [
			{ name: 'state', label: 'LED State', tagName: 'bit0',  numItem: 1, size: 1, disp: 'b', desc: 'LED state' }
		];
		
         vm.objCmdComm = [
            { name: 'comm', label: 'Comm Set',  tagName: 'byte0',  numItem: 1, size: 1, disp: 'b', desc: 'Communication Mode' }
        ];

		vm.objEvt = [
			{ id: 0, desc: 'Reader - Card' },
			{ id: 1, desc: 'Reader - Pin' }
		];

		vm.objType = {
			name: 'Reader',
			objTypeTag: 'reader',
			desc: 'Object type Reader',
			objTypeId: 1,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 2,
			objRecTbl: [{ name: 'config',        label: 'Configuration',  recTag: 'cfg',         tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'io',            label: 'Io',             recTag: 'io',          tblTags: vm.objRecIoState,   desc: 'Object io data' }],
			objCmdTbl: [{ name: 'displayAccess', label: 'Display access', recTag: 'disp_access', tblTags: vm.objCmdDisp,      desc: 'Display access' },
						{ name: 'displayStatus', label: 'Display status', recTag: 'disp_status', tblTags: vm.objCmdDisp,      desc: 'Display status' },
						{ name: 'cancel',        label: 'Cancel', 		  recTag: 'cancel',      tblTags: null,               desc: 'Cancel display' },
						{ name: 'local',         label: 'Local events',   recTag: 'local',       tblTags: null,               desc: 'Set object events destination to remain local' },
						{ name: 'global',        label: 'Global events',  recTag: 'global',      tblTags: null,               desc: 'Set object events destination to be forwarded to the global serial number' },
						{ name: 'Led State Set', label: 'Led State Set',  recTag: 'led',         tblTags: vm.objCmdLed,       desc: 'Set Reader LED state' },
						{ name: 'Comm Set',      label: 'Comm Set',       recTag: 'comm',        tblTags: vm.objCmdComm,      desc: 'Set Reader Communication Mode' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
