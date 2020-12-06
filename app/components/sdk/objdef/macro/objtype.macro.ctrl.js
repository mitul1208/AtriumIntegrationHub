(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MACRO
	app.controller('ObjTypeCtrl_Macro', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',         label: 'Object status',                       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',             label: 'Valid',                               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Active' },
			{ name: 'readOnly',          label: 'Read only',                           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',     label: 'Cannot be deleted',                   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',  desc: 'Entity Flag: Protected' },
			{ name: 'label',             label: 'Display name',                        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                 desc: 'Label: Display name' },
			{ name: 'trigEvtSerial',     label: 'Trigger event - Serial number',       tagName: 'serial4',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_serial',       desc: 'Trigger event - Entity - Object info - serial number; 0xFFFFFFFF=all' },
			{ name: 'trigEvtObjType',    label: 'Trigger event - object type',         tagName: 'word5',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short obj_type',        desc: 'Trigger event - Type - Object type' },
			{ name: 'trigEvtObjIdStart', label: 'Trigger event - object id start',     tagName: 'dword6',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_id_start',     desc: 'Trigger event - Entity - Object info - Id start; 0xFFFFFFFF=all' },
			{ name: 'trigEvtObjIdEnd',   label: 'Trigger event - object id end',       tagName: 'dword7',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_id_stop',      desc: 'Trigger event - Entity - Object info - Id end; 0xFFFFFFFF=all' },
			{ name: 'trigEvtObjEvt',     label: 'Trigger event - event id',            tagName: 'byte8',      numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char obj_event',        desc: 'Trigger event - Event id - Specific to each object type' },
			{ name: 'filterSerial',      label: 'Filter from whom - serial number',    tagName: 'serial9',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long snd_obj_serial',   desc: 'Filter from whom - Hidden - Object info - serial number; 0xFFFFFFFF=all' },
			{ name: 'filterObjType',     label: 'Filter from whom - object type',      tagName: 'word10',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short snd_obj_type',    desc: 'Filter from whom - Hidden - Object type' },
			{ name: 'filterObjIdStart',  label: 'Filter from whom - object id start',  tagName: 'dword11',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long snd_obj_id_start', desc: 'Filter from whom - Hidden - Object info - Id start; 0xFFFFFFFF=all' },
			{ name: 'filterObjIdEnd',    label: 'Filter from whom - object id end',    tagName: 'dword12',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long snd_obj_id_stop',  desc: 'Filter from whom - Hidden - Object info - Id end; 0xFFFFFFFF=all' },
			{ name: 'extraSerial',       label: 'Filter extra - serial number',        tagName: 'serial13',   numItem: 5, size: 4,   disp: 'adv',   c_code: 'unsigned long obj_serial',       desc: 'Filter from whom - Hidden - extra filter' },
			{ name: 'extraObjType',      label: 'Filter extra - object type',          tagName: 'word14',     numItem: 5, size: 2,   disp: 'adv',   c_code: 'unsigned short obj_type',        desc: 'Filter from whom - Hidden - extra filter' },
			{ name: 'extraObjIdStart',   label: 'Filter extra - object id',            tagName: 'dword15',    numItem: 5, size: 4,   disp: 'adv',   c_code: 'unsigned long obj_id',           desc: 'Filter from whom - Hidden - extra filter' },
			{ name: 'resObjSerial',      label: 'Resulting command - Serial number',   tagName: 'serial17',   numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_serial',       desc: 'Resulting command - Entity - Object info - serial number; 0xFFFFFFFF=all' },
			{ name: 'resObjType',        label: 'Resulting command - Object type',     tagName: 'word18',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short obj_type',        desc: 'Resulting command - Type - Object type' },
			{ name: 'resObjIdStart',     label: 'Resulting command - Object Id start', tagName: 'dword19',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_id_start',     desc: 'Resulting command - Entity - Object info - Id start; 0xFFFFFFFF=all' },
			{ name: 'resObjIdEnd',       label: 'Resulting command - Object Id end',   tagName: 'dword20',    numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long obj_id_stop',      desc: 'Resulting command - Entity - Object info - Id end; 0xFFFFFFFF=all' },
			{ name: 'resObjCmd',         label: 'Resulting command - Command id',      tagName: 'byte21',     numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char obj_cmd',          desc: 'Resulting command - Command id - Specific to each object type' },
			{ name: 'cmdSize',           label: 'Command size',                        tagName: 'word22',     numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short cmd_size',        desc: 'Resulting command - Hidden - Command size' },
			{ name: 'cmdData',           label: 'Command data',                        tagName: 'hexa23',     numItem: 1, size: 256, disp: 'adv',   c_code: 'char cmd_buf[256]',              desc: 'Resulting command - Hidden - Command data' },
			{ name: 'schedId',           label: 'Schedule id',                         tagName: 'word24',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short schedule_id',     desc: 'Schedule id' },
		];

		vm.objEvt = [
			{ id: 0, desc: 'Macro - Macro executed' }
		];

		vm.objType = {
			name: 'Macro',
			objTypeTag: 'macro',
			desc: 'Object type Macro',
			objTypeId: 8,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 100,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',  tblTags: vm.objRecCfg, desc: 'Object configuration data' }],
			objCmdTbl: [{ name: 'test',   label: 'Macro execute', recTag: 'test', tblTags: null,         desc: 'Execute macro - Test'      }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
