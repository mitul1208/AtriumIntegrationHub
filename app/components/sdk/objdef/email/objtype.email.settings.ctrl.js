(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_EMAIL_SETTINGS
	app.controller('ObjTypeCtrl_EmailSettings', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',                       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                 desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',                               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',   desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',                           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',   desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',                   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',   desc: 'Entity Flag: Protected' },
			{ name: 'label',           label: 'Display name',                        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                  desc: 'Label: Display name' },
			{ name: 'emailFrom',       label: 'Email from',                          tagName: 'email3',     numItem: 1, size: 128, disp: 'basic', c_code: 'char email_from[128]',            desc: 'Email settings - Server information - Email send as' },
			{ name: 'smtpServerUrl',   label: 'SMTP server url',                     tagName: 'url4',       numItem: 1, size: 128, disp: 'basic', c_code: 'char smtp_server[128]',           desc: 'Email settings - Server information - SMTP server' },
			{ name: 'optSmtpNeedAuth', label: 'SMTP option - need authentification', tagName: 'bit5',       numItem: 1, size: 1,   disp: 'basic', c_code: 'char smtp_need_authentification', desc: 'Email settings - Server information - Enable encrypted connection (SSL/TLS)' },
			{ name: 'smtpUser',        label: 'SMTP username',                       tagName: 'utf6',       numItem: 1, size: 128, disp: 'basic', c_code: 'char smtp_user[128]',             desc: 'Email settings - User login - Username' },
			{ name: 'smtpPswd',        label: 'SMTP password',                       tagName: 'pswd7',      numItem: 1, size: 128, disp: 'basic', c_code: 'char smtp_password[128]',         desc: 'Email settings - User login - Password' },
			{ name: 'smtpPort',        label: 'SMTP port',                           tagName: 'word8',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short smtp_port',        desc: 'Email settings - Server information - SMTP port' }
		];

		vm.objType = {
			name: 'Email settings',
			objTypeTag: 'email_setting',
			desc: 'Object type Email settings',
			objTypeId: 70,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};


		$sdkObjTypeSvc.create(vm.objType);
	});

})();
