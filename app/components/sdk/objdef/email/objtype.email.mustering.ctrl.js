(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_EMAIL_MUSTERING
	app.controller('ObjTypeCtrl_EmailMustering', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                   desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted',   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Protected' },
			{ name: 'label',         label: 'Display name',        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                    desc: 'Label: Display name' },
			{ name: 'inputSerial',   label: 'Input serial number', tagName: 'serial3',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long input_serial_number', desc: 'Email muster configuration - Trigger serial number' },
			{ name: 'inputId',       label: 'Input id',            tagName: 'byte4',      numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char input_id',            desc: 'Email muster configuration - Trigger input id' },
			{ name: 'to',            label: 'To',                  tagName: 'utf5',       numItem: 1, size: 128, disp: 'basic', c_code: 'char to[128]',                      desc: 'Email muster configuration - Send to (email)' },
			{ name: 'otpInside',     label: 'Option inside',       tagName: 'bit6',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char inside:1',                     desc: 'Email muster configuration - Locations' },
			{ name: 'otpOutside',    label: 'Option outside',      tagName: 'bit7',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char outside:1',                    desc: 'Email muster configuration - Locations' },
			{ name: 'otpUnknown',    label: 'Option unknown',      tagName: 'bit8',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char unknown:1',                    desc: 'Email muster configuration - Locations' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'Email mustering - DNS error' },
			{ id: 1, desc: 'Email mustering - SMTP connect failure' },
			{ id: 2, desc: 'Email mustering - SMTP authentication failure' },
			{ id: 3, desc: 'Email mustering - Send successful' }
		];

		vm.objType = {
			name: 'Email mustering',
			objTypeTag: 'email_mustering',
			desc: 'Object type Reader',
			objTypeId: 85,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config', label: 'Configuration',  recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
