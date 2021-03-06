(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_USER_CODE
	app.controller('ObjTypeCtrl_UserCode', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',         label: 'Object status',                           tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                                        desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',             label: 'Valid',                                   tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',                          desc: 'Entity Flag: Active' },
			{ name: 'readOnly',          label: 'Read only',                               tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                          desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',     label: 'Cannot be deleted',                       tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',                          desc: 'Entity Flag: Protected' },
			{ name: 'guid',              label: 'GUID',                                    tagName: 'guid2',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char guid[16]',                                          desc: 'Guid' },
			{ name: 'label',             label: 'Display name',                            tagName: 'label3',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                                         desc: 'Label: Display name' },
			{ name: 'userId',            label: 'User id',                                 tagName: 'dword4',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_id',                                  desc: 'User id (Referenced in USER Table - 0 based)' },
			{ name: 'userCodeId',        label: 'User code id',                            tagName: 'key5',       numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_code_id',                             desc: 'User code (PIN) - 5 HEX padded with F (FFF12345)' },
			{ name: 'optCanArm',         label: 'Option can arm',                          tagName: 'bit6',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.can_arm:1',                                  desc: 'Media Valid for alarm' },
			{ name: 'optCanDisarm',      label: 'Option can disarm',                       tagName: 'bit7',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.can_disarm:1',                               desc: 'Media Valid for alarm' },
			{ name: 'optCanAccess',      label: 'Option can access',                       tagName: 'bit8',       numItem: 1, size: 1,  disp: 'basic', c_code: 'long option.can_access:1',                               desc: 'Media Valid for access' },
			{ name: 'optInterlockOvr',   label: 'Option interlock override',               tagName: 'bit10',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.interlock_ovride:1',                         desc: 'Interlock override' },
			{ name: 'optExtendDly',      label: 'Option extend delay',                     tagName: 'bit11',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.extend_delay:1',                             desc: 'Extended Delay Enable' },
			{ name: 'optAntiPbackOvr',   label: 'Option anti-passback override',           tagName: 'bit12',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.antipass_ovride:1',                          desc: 'Anti PassBack override' },
			{ name: 'optAccessCnt',      label: 'Option access count',                     tagName: 'bit13',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.access_count:1',                             desc: 'Count Number of Access' },
			{ name: 'optTrace',          label: 'Option trace',                            tagName: 'bit14',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.trace:1',                                    desc: 'Trace Media Access' },
			{ name: 'optGuardTour',      label: 'Option guard tour',                       tagName: 'bit15',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.guard_tour:1',                               desc: 'Guard Tour Media' },
			{ name: 'optCapacOvr',       label: 'Option capacity override',                tagName: 'bit16',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.capacity_overide:1',                         desc: '' },
			{ name: 'optProgMode',       label: 'Option programming mode',                 tagName: 'bit17',      numItem: 1, size: 1,  disp: 'basic', c_code: 'long option.programming_mode:1',                         desc: 'Media can enable/disable programming mode' },
			{ name: 'activationGMT',     label: 'Activation GMT',                          tagName: 'utc_time18', numItem: 1, size: 4,  disp: 'adv',   c_code: 'unsigned long activation_GMT',                           desc: 'Activation in Greenwich Mean Time' },
			{ name: 'expirationGMT',     label: 'Expiration GMT',                          tagName: 'utc_time19', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long expiration_GMT',                           desc: 'Expiration in Greenwich Mean Time (None=FFFFFFFF)' },
            { name: 'userGuid',          label: 'User GUID',                               tagName: 'guid20',     numItem: 1, size: 16, disp: 'basic', c_code: 'char user_guid[16]',                                     desc: 'Guid of the user referenced in USER Table' },
            { name: 'optLdAct',          label: 'Option lockdown - Activation',            tagName: 'bit21',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownActivation : 1',   desc: 'Lock Down Activation: This entity can be used to activate the Lock Down following the Lock Down entity activation options' },
            { name: 'optLdDeact',        label: 'Option lockdown - Deactivation',          tagName: 'bit22',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownDeactivation : 1', desc: 'Lock Down Deactivation: Lock Down Deactivation. This entity can be used to deactivate the Lock Down following the Lock Down entity deactivation options' },
            { name: 'optLdOverride',     label: 'Option lockdown - Override',              tagName: 'bit23',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownOverride : 1',     desc: 'Lock Down Override: Allow "grant access" on single door' },
            { name: 'optLdAreaAck',      label: 'Option lockdown - Partition acknowledge', tagName: 'bit24',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_LockDownAreaAck : 1',      desc: 'Lock Down Partition acknowledge: Lock Down Cleared Partition Acknowledge. Used to indicate that a partition as been verified by the Authority during Lock Down. It can be used to list the remaining partition to verify.' },
            { name: 'optUseCnt',         label: 'Option - Use counter',                    tagName: 'bit25',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_UseCounter : 1',           desc: 'Indicates usage of the Counter status. Item will be expired as soon as the Counter status value reaches 0.' },
            { name: 'optDoubleSwipeEvt', label: 'Option - Generate double swipe event',    tagName: 'bit26',      numItem: 1, size: 1,  disp: 'basic', c_code: 'user_login_option_st option.b_DoubleSwipeEvt : 1',       desc: 'Generate door event on double swipe' }
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
			{ id: 0, desc: 'User code - Counter Zero' },
			{ id: 1, desc: 'User code - Counter Set' },
			{ id: 2, desc: 'User code - Counter Decrement' }
		];

		vm.objTreeCodeUser = [
			{ name: 'userId',          label: 'User id',                                 tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_number',                               desc: 'Reference in USER Table' },
			{ name: 'codeId',          label: 'User code id',                            tagName: 'dword1',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long usercode_number',                           desc: 'Reference in USER CODE Table' },
        ];
		vm.objTreeCodeId = [
			{ name: 'code',            label: 'Code',                                    tagName: 'key0',       numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long code',                                      desc: 'Validation Code (PIN saved on 4 HEX bytes padded with FF)' },
        ];

		vm.objType = {
			name: 'User Code',
			objTypeTag: 'user_code',
			desc: 'Object type User Code',
			objTypeId: 13,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 10000,
            objRecTbl: [{ name: 'config', label: 'Configuration',     recTag: 'cfg',    tblTags: vm.objRecCfg,          desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',            recTag: 'status', tblTags: vm.objRecStatus,       desc: 'Object status data'        }],
            objCmdTbl: [{ name: 'update', label: 'Update status',     recTag: 'update', tblTags: vm.objCmdUpdateStatus, desc: 'Update status' },
                        { name: 'set',    label: 'Set counter value', recTag: 'set',    tblTags: vm.objCmdSetCount,     desc: 'Set counter value' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: [{ name: 'codeUser', label: 'Code user',   recTag: 'code_user', tblTags: vm.objTreeCodeUser,  desc: 'Search by code user'   },
                         { name: 'codeId',   label: 'Code number', recTag: 'code_id',   tblTags: vm.objTreeCodeId,    desc: 'Search by code number' }]
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
