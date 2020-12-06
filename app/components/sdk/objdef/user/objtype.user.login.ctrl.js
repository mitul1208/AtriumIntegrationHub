(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_USER_LOGIN
	app.controller('ObjTypeCtrl_UserLogin', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',                           tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                                        desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',                                   tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',                          desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',                               tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                          desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',                       tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                          desc: 'Entity Flag: Protected' },
			{ name: 'optSw',           label: 'Allow PC software access',                tagName: 'bit2',       numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.software:1',                 desc: 'Allow PC software access' },
			{ name: 'optWeb',          label: 'Allow Web access',                        tagName: 'bit3',       numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.webpage:1',                  desc: 'Allow Web access' },
			{ name: 'hint',            label: 'Password hint',                           tagName: 'utf4',       numItem: 1, size: 64, disp: 'basic', c_code: 'char hint[64]',                                          desc: 'Password hint' },
			{ name: 'label',           label: 'Display name',                            tagName: 'label5',     numItem: 1, size: 64, disp: 'basic', c_code: 'char username[64]',                                      desc: 'Username' },
			{ name: 'pswd',            label: 'Password',                                tagName: 'pswd6',      numItem: 1, size: 64, disp: 'basic', c_code: 'char pwd[64]',                                           desc: 'Password' },
			{ name: 'userGuid',        label: 'User GUID',                               tagName: 'guid7',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char user_guid[16]',                                     desc: 'Guid' },
			{ name: 'userId',          label: 'User id',                                 tagName: 'dword8',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_id',                                  desc: 'Reference in USER Table (index)' },
			{ name: 'guid',            label: 'GUID',                                    tagName: 'guid9',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char guid[16]',                                          desc: 'Guid' },
			{ name: 'activationGMT',   label: 'Activation GMT', 		                 tagName: 'utc_time10', numItem: 1, size: 4,  disp: 'adv',   c_code: 'unsigned long activation_GMT',                           desc: 'Activation in Greenwich Mean Time' },
			{ name: 'expirationGMT',   label: 'Expiration GMT', 			             tagName: 'utc_time11', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long expiration_GMT',                           desc: 'Expiration in Greenwich Mean Time (None=FFFFFFFF)' },
			{ name: 'lastViewWeb',     label: 'Last view web',                           tagName: 'byte12',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'char last_view_web',                                     desc: 'N/U' },
			{ name: 'systemRole',      label: 'System role',                             tagName: 'byte13',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'char system_role',                                       desc: 'Role: 0=unknown; 1=installer; 2=admin; 3=operator; 4=guest; 5=Custom' },
			{ name: 'accLvlGrpId',     label: 'Access level group id',                   tagName: 'word14',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short acc_level_grp_id',                        desc: 'Access Level Group id' },
            { name: 'optSdk',          label: 'Allow SDK access',                        tagName: 'bit15',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.sdk:1',                      desc: 'Allow SDK access' },
            { name: 'optLdAct',        label: 'Option lockdown - Activation',            tagName: 'bit16',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownActivation : 1',   desc: 'Lock Down Activation: This entity can be used to activate the Lock Down following the Lock Down entity activation options' },
            { name: 'optLdDeact',      label: 'Option lockdown - Deactivation',          tagName: 'bit17',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownDeactivation : 1', desc: 'Lock Down Deactivation: Lock Down Deactivation. This entity can be used to deactivate the Lock Down following the Lock Down entity deactivation options' },
            { name: 'optLdOverride',   label: 'Option lockdown - Override',              tagName: 'bit18',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownOverride : 1',     desc: 'Lock Down Override: Allow "grant access" on single door' },
            { name: 'optLdAreaAck',    label: 'Option lockdown - Partition acknowledge', tagName: 'bit19',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownAreaAck : 1',      desc: 'Lock Down Partition acknowledge: Lock Down Cleared Partition Acknowledge. Used to indicate that a partition as been verified by the Authority during Lock Down. It can be used to list the remaining partition to verify.' },
            { name: 'optUseCnt',       label: 'Option - Use counter',                    tagName: 'bit20',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_UseCounter : 1',           desc: 'Indicates usage of the Counter status. Item will be expired as soon as the Counter status value reaches 0.' }
		];
		vm.objRecStatus = [
			{ name: 'cnt',             label: 'Counter',                                 tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long Counter',                                  desc: 'Used in conjunction with the b_UseCounter option, this counter is decremented upon each usage of the item. Item will be expired as soon as the Counter status value reaches 0.' },
            { name: 'timeStampUtc',    label: 'Last usage time stamp (UTC)',             tagName: 'utc_time1',  numItem: 1, size: 4,  disp: 'adv',   c_code: 'unsigned long TimeStampLast_UTC',                        desc: 'Indicates last usage of the item (0xFFFFFFFF = invalid)' },
            { name: 'timeStampLoc',    label: 'Last usage time stamp (LOCAL)',           tagName: 'loc_time2',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long TimeStampLast_LOCAL',                      desc: 'Indicates last usage of the item (0xFFFFFFFF = invalid)' },
            { name: 'lastSetCnt',      label: 'Last Set Counter',                        tagName: 'dword3',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long CounterLastSet',                           desc: 'Last set counter value' },
            { name: 'expiryCntLoc',    label: 'User counter expiration (LOCAL)',         tagName: 'loc_time4',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long ExpirationCounter_LOCAL',                  desc: 'Expiration date for counter (0 and 0xFFFFFFFF = not used)' }
        ];

		vm.objCmdUpdateStatus = [
			{ name: 'timeStampUtc',    label: 'Last usage time stamp (UTC)',             tagName: 'utc_time0',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long TimeStampLast_UTC',                        desc: 'Indicates last usage of the item (0xFFFFFFFF = invalid)' },
            { name: 'timeStampLoc',    label: 'Last usage time stamp (LOCAL)',           tagName: 'loc_time1',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long TimeStampLast_LOCAL',                      desc: 'Indicates last usage of the item (0xFFFFFFFF = invalid)' },
            { name: 'optDecCnt',       label: 'Option - Decrement counter',              tagName: 'bit2',       numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char Opt',                                      desc: 'When true, request to decrement counter' },
            { name: 'decCnt',          label: 'Decrement counter value',                 tagName: 'dword3',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long CountToDec',                               desc: 'Variable number of credits to decrement when USER_CNT_CMD_UPDATE_STATUS_OPT_MASK_DEC_CNT is set' }
        ];
		vm.objCmdSetCount = [
            { name: 'cnt',             label: 'Counter',                                 tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long Counter',                                  desc: 'Used in conjunction with the b_UseCounter option, this counter is decremented upon each usage of the item. Item will be expired as soon as the Counter status value reaches 0.' },
            { name: 'expiryCntLoc',    label: 'User counter expiration (LOCAL)',         tagName: 'loc_time1',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long ExpirationCounter_LOCAL',                  desc: 'Expiration date for counter (0 and 0xFFFFFFFF = not used)' }
		];

		vm.objEvt = [
			{ id: 0, desc: 'User login - Web access' },
			{ id: 1, desc: 'User login - Web locked' },
			{ id: 2, desc: 'User login - PC access user' },
			{ id: 3, desc: 'User login - PC access server' },
            { id: 4, desc: 'User login - SDK access' },
            { id: 5, desc: 'User login - Counter Zero' },
			{ id: 6, desc: 'User login - Counter Set' },
			{ id: 7, desc: 'User login - Counter Decrement' }
		];

		vm.objTreeLoginUser = [
			{ name: 'userId',          label: 'User id',                                 tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_number',                               desc: 'Reference in USER Table' },
			{ name: 'userLoginId',     label: 'User login id',                           tagName: 'dword1',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_login_number',                         desc: 'Reference in USER LOGIN Table' },
        ];
		vm.objTreeLoginName = [
			{ name: 'label',           label: 'Display name',                            tagName: 'label0',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                                          desc: 'Login display name' },
        ];

		vm.objType = {
			name: 'User Login',
			objTypeTag: 'user_login',
			desc: 'Object type User Login',
			objTypeId: 38,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 10000,
            objRecTbl: [{ name: 'config', label: 'Configuration',     recTag: 'cfg',    tblTags: vm.objRecCfg,          desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',            recTag: 'status', tblTags: vm.objRecStatus,       desc: 'Object status data'        }],
            objCmdTbl: [{ name: 'update', label: 'Update status',     recTag: 'update', tblTags: vm.objCmdUpdateStatus, desc: 'Update status' },
                        { name: 'set',    label: 'Set counter value', recTag: 'set',    tblTags: vm.objCmdSetCount,     desc: 'Set counter value' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: [{ name: 'loginUser',   label: 'Login user', recTag: 'login_user',  tblTags: vm.objTreeLoginUser,    desc: 'Search by login user' },
                         { name: 'loginName',   label: 'Login name', recTag: 'login_name',  tblTags: vm.objTreeLoginName,    desc: 'Search by login name' }]
			};


		$sdkObjTypeSvc.create(vm.objType);
	});

})();
