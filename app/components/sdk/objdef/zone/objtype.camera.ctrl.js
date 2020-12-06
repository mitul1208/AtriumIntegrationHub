(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_CAMERA
	app.controller('ObjTypeCtrl_Camera', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                   desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Protected' },
			{ name: 'label',           label: 'Display name',        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                    desc: 'Label: Display name' },
			{ name: 'camUrl',          label: 'Camera url',          tagName: 'url3',       numItem: 1, size: 256, disp: 'basic', c_code: 'char web_page_url[256]',            desc: 'Camera url' },
			{ name: 'liveUrl',         label: 'Live feed url',       tagName: 'url4',       numItem: 1, size: 256, disp: 'basic', c_code: 'char live_url[256]',                desc: 'Live feed url' },
			{ name: 'sizeRatioWidth',  label: 'Size ratio - Width',  tagName: 'word5',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short video_l',            desc: 'Size ratio - Width (i.e. 16)' },
			{ name: 'sizeRatioHeight', label: 'Size ratio - Height', tagName: 'word6',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short video_h',            desc: 'Size ratio - Height (i.e. 9)' },
			{ name: 'soundEnable',     label: 'Sound enable',        tagName: 'byte7',      numItem: 1, size: 1,   disp: 'adv',   c_code: 'char sound',                        desc: 'Sound: 0=Disabled; 1=Enabled' },
			{ name: 'formatType',      label: 'Format type',         tagName: 'byte8',      numItem: 1, size: 1,   disp: 'adv',   c_code: 'char type',                         desc: 'Type: H264; MJPEG' },
			{ name: 'username',        label: 'Username',            tagName: 'utf9',       numItem: 1, size: 64,  disp: 'adv',   c_code: 'char username[64]',                 desc: 'User' },
			{ name: 'pswd',            label: 'Password',            tagName: 'utf10',      numItem: 1, size: 64,  disp: 'adv',   c_code: 'char password[64]',                 desc: 'Password' },
			{ name: 'partitionSerial', label: 'Partition serial',    tagName: 'serial11',   numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long partition_id.serial', desc: 'Partition id' },
			{ name: 'partitionId',     label: 'Partition id',        tagName: 'byte12',     numItem: 1, size: 1,   disp: 'adv',   c_code: 'unsigned char partition_id.id',     desc: 'Partition id' }
        ];

		vm.objRecCfg2 = [
			{ name: 'objStatus',       label: 'Object status',       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                       desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',         desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',         desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',         desc: 'Entity Flag: Protected' },
            { name: 'label',           label: 'Display name',        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'char label[64]',                        desc: 'Label: Display name' },
            { name: 'hostUrl',         label: 'Host URL',            tagName: 'utf2',       numItem: 1, size: 128, disp: 'basic', c_code: 'unsigned char     host_url[128]',       desc: 'Camera url or ip in ascii (192.168.1.8 or www.testcamera.com)' },
            { name: 'hostPort',        label: 'Host port',           tagName: 'word3',      numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short    host_port',           desc: 'Camera tcp port' },
            { name: 'uriStart',        label: 'URI start',           tagName: 'utf4',       numItem: 1, size: 128, disp: 'basic', c_code: 'unsigned char     uri_start[128]',      desc: 'uri to start recording video (/cgi-bin/admin/setvi.cgi?vi0=1)' },
            { name: 'uriStop',         label: 'URI stop',            tagName: 'utf5',       numItem: 1, size: 128, disp: 'basic', c_code: 'unsigned char     uri_stop[128]',       desc: 'uri to stop recording video (/cgi-bin/admin/setvi.cgi?vi0=0)' },
            { name: 'uriUser',         label: 'URI username',        tagName: 'utf6',       numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char     username[64]',        desc: 'User for Digest Auth' },
            { name: 'uriPswd',         label: 'URI password',        tagName: 'utf7',       numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char     password[64]',        desc: 'Password for Digest Auth' },
            { name: 'ftpUrl',          label: 'FTP URL',             tagName: 'utf8',       numItem: 1, size: 128, disp: 'basic', c_code: 'unsigned char     ftp_url[128]',        desc: 'FTP URL' },
            { name: 'ftpUser',         label: 'FTP username',        tagName: 'utf9',       numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char     ftp_username[64]',    desc: 'FTP User' },
            { name: 'ftpPswd',         label: 'FTP password',        tagName: 'utf10',      numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char     ftp_password[64]',    desc: 'FTP Password' },
            { name: 'ftpPort',         label: 'FTP port',            tagName: 'word11',     numItem: 1, size: 2,   disp: 'basic', c_code: 'unsigned short    ftp_port',            desc: 'FTP port' },
            { name: 'viewUser',        label: 'Viewer User',         tagName: 'utf12',      numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char     viewer_username[64]', desc: 'Viewer User' },
            { name: 'viewPswd',        label: 'Viewer Password',     tagName: 'utf13',      numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char     viewer_password[64]', desc: 'Viewer Password' },
        ];

		vm.objType = {
			name: 'Camera',
			objTypeTag: 'camera',
			desc: 'Object type Camera',
			objTypeId: 72,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 10,
            objRecTbl: [{ name: 'config',      label: 'Configuration',      recTag: 'cfg',   tblTags: vm.objRecCfg,  desc: 'Object configuration data'   },
                        { name: 'config2',     label: 'Configuration 2',    recTag: 'cfg2',  tblTags: vm.objRecCfg2, desc: 'Object configuration data 2' }],
            objCmdTbl: [{ name: 'cmdRecClip',  label: 'Record single clip', recTag: 'clip',  tblTags: null,          desc: 'Record single clip request' },
                        { name: 'cmdRecStart', label: 'Record clip start',  recTag: 'start', tblTags: null,          desc: 'Record clip start request' },
                        { name: 'cmdRecStop',  label: 'Record clip stop',   recTag: 'stop',  tblTags: null,          desc: 'Record clip stop request' }],
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
