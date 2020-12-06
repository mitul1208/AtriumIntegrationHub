(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_FLOOR
	app.controller('ObjTypeCtrl_Firmware', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecStatus = [
            { name: 'flagValid',        label: 'Flag Valid',              tagName: 'byte0',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char flag_valid',                  desc: '' },
            { name: 'flagNew',          label: 'Flag New',                tagName: 'byte1',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char flag_new',                    desc: '' },
            { name: 'errCode',          label: 'Error Code',              tagName: 'byte2',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char error_code',                  desc: '' },
            { name: 'fwVersion',        label: 'Firmware Version',        tagName: 'byte3',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char firmware_version',            desc: '' },
            { name: 'fwRevision',       label: 'Firmware Revision',       tagName: 'byte4',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char firmware_revision',           desc: '' },
            { name: 'fwBuild',          label: 'Firmware Build',          tagName: 'dword5',    numItem: 1, size: 4,  disp: 'basic', c_code: 'long firmware_build',              desc: '' },
            { name: 'fwDay',            label: 'Firmware Build Day',      tagName: 'byte6',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char build_day',                   desc: '' },
            { name: 'fwMonth',          label: 'Firmware Build Month',    tagName: 'byte7',     numItem: 1, size: 1,  disp: 'basic', c_code: 'char build_month',                 desc: '' },
            { name: 'fwYear',           label: 'Firmware Build Year',     tagName: 'word8',     numItem: 1, size: 2,  disp: 'basic', c_code: 'short build_year',                 desc: '' },
            { name: 'validateTS',       label: 'Validate timestamp',      tagName: 'dword9',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long validate_timestamp', desc: '' },
            { name: 'requestTS',        label: 'Request timestamp',       tagName: 'dword10',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long request_timestamp',  desc: '' },
            { name: 'flagAutoupdateOK', label: 'Flag autoupdate succeed', tagName: 'byte11',    numItem: 1, size: 1,  disp: 'basic', c_code: 'char flag_autoupdate_succeed',     desc: '' }
        ];

		vm.objRecStatusExt = [
            { name: 'fsId',       label: 'File System - ID',         tagName: 'dword0',      numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long fs_id',             desc: '' },
            { name: 'fsLen',      label: 'File System - Length',     tagName: 'dword1',      numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long fs_length',         desc: '' },
            { name: 'fsFileCnt',  label: 'File System - File Count', tagName: 'dword2',      numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long fs_file_count',     desc: '' },
            { name: 'fwVersion',  label: 'Firmware Version',         tagName: 'byte3',       numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char firmware_version',  desc: '' },
            { name: 'fwRevision', label: 'Firmware Revision',        tagName: 'byte4',       numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char firmware_revision', desc: '' },
            { name: 'fwBuild',    label: 'Firmware Build',           tagName: 'dword5',      numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long firmware_build',    desc: '' }
        ];

		vm.objRecDiag = [
            { name: 'copyRam',          label: 'Copy RAM',                 tagName: 'byte0',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char copy_ram',                 desc: '' },
            { name: 'mismatchVersion',  label: 'Mismatch Version',         tagName: 'byte1',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char mismatch_version',         desc: '' },
            { name: 'fileOutOfRange',   label: 'File Out Of Range',        tagName: 'byte2',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char file_out_of_range',        desc: '' },
            { name: 'fileCntExceedMem', label: 'File Count Exceed Memory', tagName: 'byte3',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char file_count_exceed_memory', desc: '' },
            { name: 'fileMissingCnt',   label: 'File missing count',       tagName: 'byte4',      numItem: 1,  size: 1,  disp: 'basic', c_code: 'unsigned char file_missing_count',       desc: '' },
            { name: 'fileMissing',      label: 'File missing',             tagName: 'utf5',       numItem: 10, size: 39, disp: 'basic', c_code: 'unsigned char file_missing[10][39]',     desc: '' }
        ];

		vm.objRecLang = [
            { name: 'numLang',       label: 'Number of language', tagName: 'byte0',      numItem: 1,  size: 1, disp: 'basic', c_code: 'unsigned char NumLang', desc: '' },
            { name: 'supportedLang', label: 'Supported language', tagName: 'byte1',      numItem: 50, size: 1, disp: 'basic', c_code: 'unsigned char SupportedLang[50]', desc: '' }
        ];

		vm.objEvt = [
			{ id: 0, desc: 'Firmware - Validation finish' },
			{ id: 1, desc: 'Firmware - Update start' },
			{ id: 2, desc: 'Firmware - From auto-update' },
			{ id: 3, desc: 'Firmware - Update external file start' }
		];

		vm.objType = {
			name: 'Firmware',
			objTypeTag: 'firmware',
			desc: 'Object type Firmware',
			objTypeId: 25,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'status',    label: 'Status',            recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object Status data' },
						{ name: 'statusExt', label: 'Status Ext', 	     recTag: 'status2',  tblTags: vm.objRecStatusExt, desc: 'Object Status Ext data' },
						{ name: 'diag',      label: 'Diagnostic',        recTag: 'trouble',  tblTags: vm.objRecDiag,      desc: 'Object Diagnostic data' },
						{ name: 'lang',      label: 'Language', 		 recTag: 'addr',     tblTags: vm.objRecLang,      desc: 'Object Language data' }],
			objCmdTbl: [{ name: 'validate',  label: 'Validate firmware', recTag: 'validate', tblTags: null,               desc: 'Validate firmware' },
						{ name: 'update',    label: 'Update firmware',   recTag: 'update',   tblTags: null,               desc: 'Update firmware' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
