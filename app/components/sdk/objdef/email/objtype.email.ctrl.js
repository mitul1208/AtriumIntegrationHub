(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_EMAIL
	app.controller('ObjTypeCtrl_Email', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;


		vm.objRecCfg = [
			{ name: 'objStatus',         label: 'Object status',                      tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',             label: 'Valid',                              tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',          label: 'Read only',                          tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',     label: 'Cannot be deleted',                  tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'label',             label: 'Display name',                       tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char label[64]',        desc: 'Label: Display name' },
			{ name: 'subject',           label: 'Subject',                            tagName: 'utf3',       numItem: 1, size: 128, disp: 'basic', c_code: 'char subject[128]',              desc: 'Subject' },
			{ name: 'trigEvtSerial',     label: 'Trigger event - Serial number',      tagName: 'serial4',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_serial',       desc: 'Trigger event - Entity - Object info - serial number; 0xFFFFFFFF = all' },
			{ name: 'trigEvtObjType',    label: 'Trigger event - object type',        tagName: 'word5',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short obj_type',        desc: 'Trigger event - Type - Object type' },
			{ name: 'trigEvtObjIdStart', label: 'Trigger event - object id start',    tagName: 'dword6',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_id_start',     desc: 'Trigger event - Entity - Object info - Id start; 0xFFFFFFFF = all' },
			{ name: 'trigEvtObjIdEnd',   label: 'Trigger event - object id end',      tagName: 'dword7',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_id_stop',      desc: 'Trigger event - Entity - Object info - Id end; 0xFFFFFFFF = all' },
			{ name: 'trigEvtObjEvt',     label: 'Trigger event - event id',           tagName: 'byte8',      numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char obj_event',        desc: 'Trigger event - Event id - Specific to each object type' },
			{ name: 'filterSerial',      label: 'Filter from whom - serial number',   tagName: 'serial9',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long snd_obj_serial',   desc: 'Filter from whom - Hidden - Object info - serial number; 0xFFFFFFFF = all' },
			{ name: 'filterObjType',     label: 'Filter from whom - object type',     tagName: 'word10',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short snd_obj_type',    desc: 'Filter from whom - Hidden - Object type' },
			{ name: 'filterObjIdStart',  label: 'Filter from whom - object id start', tagName: 'dword11',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long snd_obj_id_start', desc: 'Filter from whom - Hidden - Object info - Id start; 0xFFFFFFFF = all' },
			{ name: 'filterObjIdEnd',    label: 'Filter from whom - object id end',   tagName: 'dword12',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long snd_obj_id_stop',  desc: 'Filter from whom - Hidden - Object info - Id end; 0xFFFFFFFF = all' },
			{ name: 'extraSerial',       label: 'Email extra - serial number',        tagName: 'serial13',   numItem: 5, size: 4,   disp: 'adv',   c_code: 'unsigned long obj_serial',       desc: 'Email extra - Object serial number' },
			{ name: 'extraObjType',      label: 'Email extra - object type',          tagName: 'word14',     numItem: 5, size: 2,   disp: 'adv',   c_code: 'unsigned short obj_type',        desc: 'Email extra - Object type' },
			{ name: 'extraObjIdStart',   label: 'Email extra - object id',            tagName: 'dword15',    numItem: 5, size: 4,   disp: 'adv',   c_code: 'unsigned long obj_id',           desc: 'Email extra - Object id' },
			{ name: 'schedId',           label: 'Schedule id',                        tagName: 'word16',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short schedule_id',     desc: 'Schedule id' },
			{ name: 'msg',               label: 'Message',                            tagName: 'utf17',      numItem: 1, size: 256, disp: 'basic', c_code: 'char message[256]',              desc: 'Message' },
			{ name: 'msgExtra',          label: 'Message extra',                      tagName: 'utf18',      numItem: 1, size: 256, disp: 'adv',   c_code: 'char message_extra[256]',        desc: 'Message extra' }
		];

		vm.objRecAddr = [
			{ name: 'objStatus',     label: 'Object status',     tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',               desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',         label: 'Valid',             tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
			{ name: 'readOnly',      label: 'Read only',         tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
			{ name: 'to',            label: 'To',                tagName: 'email2',     numItem: 1, size: 256, disp: 'basic', c_code: 'char to[256]',                  desc: 'Email information - To' },
			{ name: 'cc',            label: 'Cc',                tagName: 'email3',     numItem: 1, size: 256, disp: 'adv',   c_code: 'char cc[256]',                  desc: 'Email information - Cc' },
			{ name: 'bcc',           label: 'Bcc',               tagName: 'email4',     numItem: 1, size: 256, disp: 'adv',   c_code: 'char bcc[256]',                 desc: 'Email information - Bcc' }
		];

		vm.objCmdMuster = [
			{ name: 'to',         label: 'To',             tagName: 'email0', numItem: 1, size: 128, disp: 'basic', c_code: 'char to[128]', desc: '' },
			{ name: 'optInside',  label: 'Option inside',  tagName: 'bit1',   numItem: 1, size: 1,   disp: 'basic', c_code: 'char inside',  desc: '' },
			{ name: 'optOutside', label: 'Option outside', tagName: 'bit2',   numItem: 1, size: 1,   disp: 'basic', c_code: 'char outside', desc: '' },
			{ name: 'optUnknown', label: 'Option unknown', tagName: 'bit3',   numItem: 1, size: 1,   disp: 'basic', c_code: 'char unknown', desc: '' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'Email - DNS error' },
			{ id: 1, desc: 'Email - SMTP connect failure' },
			{ id: 2, desc: 'Email - SMTP authentication failure' },
			{ id: 3, desc: 'Email - Send successful' }
		];

		vm.objType = {
			name: 'Email',
			objTypeTag: 'email',
			desc: 'Object type Email',
			objTypeId: 69,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 100,
			objRecTbl: [{ name: 'config',     label: 'Configuration',   recTag: 'cfg',      tblTags: vm.objRecCfg,    desc: 'Object configuration data' },
						{ name: 'address',    label: 'Email address',   recTag: 'addr',     tblTags: vm.objRecAddr,   desc: 'Object email address data' }],
			objCmdTbl: [{ name: 'test',       label: 'Test email',      recTag: 'test',     tblTags: null,            desc: 'Test email' },
						{ name: 'mustering',  label: 'Email mustering', recTag: 'muster',   tblTags: vm.objCmdMuster, desc: 'Start email mustering' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
