(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_MODULE_TABLE
	app.controller('ObjTypeCtrl_Syslog', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',     label: 'Object status',        tagName: 'obj_status', numItem: 1,   size: 1,  disp: 'basic', c_code: 'char obj_status',                desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },/*  */
            { name: 'senderObjType', label: 'Sender Object Type',   tagName: 'word1',      numItem: 1,   size: 2,  disp: 'basic', c_code: 'unsigned short sender_obj_type', desc: '' },
            { name: 'size',          label: 'Size',                 tagName: 'word2',      numItem: 1,   size: 2,  disp: 'adv',   c_code: 'unsigned short size',            desc: '' },
            { name: 'senderSerial',  label: 'Sender Serial Number', tagName: 'serial3',    numItem: 1,   size: 4,  disp: 'basic', c_code: 'unsigned long sender_serial',    desc: '' },
            { name: 'senderObjId',   label: 'Sender Object Id',     tagName: 'dword4',     numItem: 1,   size: 4,  disp: 'adv',   c_code: 'unsigned long sender_obj_id',    desc: '' },
            { name: 'syslogCode',    label: 'System Log Code',      tagName: 'dword5',     numItem: 1,   size: 4,  disp: 'adv',   c_code: 'unsigned long system_log_code',  desc: '' },
            { name: 'timeStampUTC',  label: 'Timestamp UTC',        tagName: 'utc_time6',  numItem: 1,   size: 4,  disp: 'adv',   c_code: 'unsigned long timestamp',        desc: '' },
            { name: 'cmd',           label: 'Command',              tagName: 'dword7',     numItem: 1,   size: 4,  disp: 'adv',   c_code: 'unsigned long command',          desc: '' },
            { name: 'cmdBuf',        label: 'Command Buffer',       tagName: 'utf8',       numItem: 1,   size: 64, disp: 'basic', c_code: 'char cmd_buf[64]',               desc: '' },
        ];

		vm.objType = {
			name: 'System Logs',
			objTypeTag: 'syslog',
			desc: 'Object type System Logs',
			objTypeId: 31,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 200,
			objRecTbl: [{ name: 'config',  label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,        desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
