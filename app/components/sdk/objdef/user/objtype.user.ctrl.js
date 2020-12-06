(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_USER
	app.controller('ObjTypeCtrl_User', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',       label: 'Object status',                 tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                    desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',           label: 'Valid',                         tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',      desc: 'Entity Flag: Active' },
			{ name: 'readOnly',        label: 'Read only',                     tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',      desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',   label: 'Cannot be deleted',             tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',      desc: 'Entity Flag: Protected' },
			{ name: 'guid',            label: 'GUID',                          tagName: 'guid2',      numItem: 1, size: 16, disp: 'basic', c_code: 'unsigned char guid[16]',             desc: 'GUID (required to associate with user code)' },
			{ name: 'firstName',       label: 'First name',                    tagName: 'label3',     numItem: 1, size: 32, disp: 'basic', c_code: 'user_label_st label.first_name[]',   desc: 'User label - First name' },
			{ name: 'lastName',        label: 'Last name',                     tagName: 'label4',     numItem: 1, size: 32, disp: 'basic', c_code: 'user_label_st label.last_name[]',    desc: 'User label - Last name' },
			{ name: 'optDualArming',   label: 'Option dual arming',            tagName: 'bit5',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.dual_arming:1',          desc: '' },
			{ name: 'optAccess',       label: 'Option access',                 tagName: 'bit6',       numItem: 1, size: 1,  disp: 'basic', c_code: 'long option.access:1',               desc: '' },
			{ name: 'optDuress',       label: 'Option duress',                 tagName: 'bit7',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.duress:1',               desc: 'Not used' },
			{ name: 'optInterlockOvr', label: 'Option interlock override',     tagName: 'bit8',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.interlock_override:1',   desc: 'Overrides interlock' },
			{ name: 'optExtendedDly',  label: 'Option extended delay',         tagName: 'bit9',       numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.extended_delay:1',       desc: 'Allow extended time' },
			{ name: 'optAntiPbackOvr', label: 'Option anti-passback override', tagName: 'bit10',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.antipassback_ovr:1',     desc: 'Overrides Anti-passback' },
			{ name: 'optAccessCnt',    label: 'Option access count',           tagName: 'bit11',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.access_count:1',         desc: '' },
			{ name: 'optTrace',        label: 'Option trace',                  tagName: 'bit12',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.trace:1',                desc: '' },
			{ name: 'optGuardTour',    label: 'Option guard tour',             tagName: 'bit13',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.guard_tour:1',           desc: '' },
			{ name: 'optCapacOvr',     label: 'Option capacity override',      tagName: 'bit14',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.capacity_ovr:1',         desc: '' },
            { name: 'optProg',         label: 'Option programming',            tagName: 'bit15',      numItem: 1, size: 1,  disp: 'basic', c_code: 'long option.programming:1',          desc: 'Can program cards' },
            { name: 'optUseCnt',       label: 'Option - Use counter',          tagName: 'bit16',      numItem: 1, size: 1,  disp: 'basic', c_code: 'long option.b_UseCounter:1',         desc: 'Indicates usage of the Counter status. Item will be expired as soon as the Counter status value reaches 0.' },
			{ name: 'optCanDisarm',    label: 'Option can disarm',             tagName: 'bit18',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.can_disarm:1',           desc: 'Can disarm' },
			{ name: 'optVisitor',      label: 'Option visitor',                tagName: 'bit19',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.visitor:1',              desc: 'Visitor' },
			{ name: 'optAsset',        label: 'Option asset',                  tagName: 'bit20',      numItem: 1, size: 1,  disp: 'adv',   c_code: 'long option.asset:1',                desc: '' },
			{ name: 'supervLvlId',     label: 'Supervisor level id',           tagName: 'word21',     numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short supervisor_level_id', desc: '' },
			{ name: 'activation',      label: 'Activation GMT',                tagName: 'utc_time22', numItem: 1, size: 4,  disp: 'adv',   c_code: 'unsigned long  activation',          desc: 'Activation in Greenwich Mean Time' },
			{ name: 'expiration',      label: 'Expiration GMT',                tagName: 'utc_time23', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long  expiration',          desc: 'Expiration in Greenwich Mean Time (None=FFFFFFFF)' },
			{ name: 'accessLvlId',     label: 'Access level id',               tagName: 'word24',     numItem: 5, size: 2,  disp: 'basic', c_code: 'unsigned short access_level_id[5]',  desc: 'Access level id' },
			{ name: 'language',        label: 'Language',                      tagName: 'word25',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short language',            desc: 'Language: 0=english; 1=french; 2=spanish; 3=chinese' },
			{ name: 'floorLvlId',      label: 'Floor level id',                tagName: 'word26',     numItem: 5, size: 2,  disp: 'basic', c_code: 'unsigned short floor_level_id[5]',   desc: 'Floor levels id' }
		];
		vm.objRecLoc = [
			{ name: 'guid',            label: 'GUID',                    tagName: 'guid0',     numItem: 1, size: 16, disp: 'adv',   c_code: 'unsigned char guid[16]', 				 desc: '' },
			{ name: 'partitionSerial', label: 'Partition serial number', tagName: 'serial1',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long partition_serial_number', desc: '' },
			{ name: 'partition',       label: 'Partition',               tagName: 'word2',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short partition',              desc: '' },
			{ name: 'timestampUTC',    label: 'Timestamp UTC',           tagName: 'utc_time3', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long timestamp_UTC',           desc: '' },
			{ name: 'timestampLocal',  label: 'Timestamp local',         tagName: 'loc_time4', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long timestamp_LOCAL',         desc: '' }
        ];
		vm.objRecStatus = [
			{ name: 'cnt',             label: 'Counter',                                 tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long Counter',                                  desc: 'Used in conjunction with the b_UseCounter option, this counter is decremented upon each usage of the item. Item will be expired as soon as the Counter status value reaches 0.' },
            { name: 'timeStampUtc',    label: 'Last usage time stamp (UTC)',             tagName: 'utc_time1',  numItem: 1, size: 4,  disp: 'adv',   c_code: 'unsigned long TimeStampLast_UTC',                        desc: 'Indicates last usage of the item (0xFFFFFFFF = invalid)' },
            { name: 'timeStampLoc',    label: 'Last usage time stamp (LOCAL)',           tagName: 'loc_time2',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long TimeStampLast_LOCAL',                      desc: 'Indicates last usage of the item (0xFFFFFFFF = invalid)' },
            { name: 'lastSetCnt',      label: 'Last Set Counter',                        tagName: 'dword3',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long CounterLastSet',                           desc: 'Last set counter value' },
            { name: 'expiryCntLoc',    label: 'User counter expiration (LOCAL)',         tagName: 'loc_time4',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long ExpirationCounter_LOCAL',                  desc: 'Expiration date for counter (0 and 0xFFFFFFFF = not used)' }
        ];

		vm.objCmdLocSet = [
			{ name: 'partitionSerial', label: 'Partition serial number', tagName: 'serial0',   numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long PartitionSerialNumber', desc: '' },
			{ name: 'partitionId',     label: 'Partition Id',            tagName: 'byte1',     numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char PartitionId',           desc: '' },
			{ name: 'locResetTime',    label: 'Location Reset Time',     tagName: 'utc_time2', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long LocationResetTime',     desc: 'in seconds, 0xFFFFFFFF = disabled (anti-passback disabled on this area)' },
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
		vm.objCmdAreaLocReset = [
			{ name: 'partitionSerial', label: 'Partition serial number', tagName: 'serial0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long PartitionSerialNumber', desc: '' },
			{ name: 'partitionId',     label: 'Partition Id',            tagName: 'byte1',   numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char PartitionId',           desc: '' }
        ];

		vm.objEvt = [
			{ id: 0, desc: 'User - Location Set' },
			{ id: 1, desc: 'User - Location Outside' },
            { id: 2, desc: 'User - Location Unknown' },
            { id: 3, desc: 'User - Counter Zero' },
			{ id: 4, desc: 'User - Counter Set' },
			{ id: 5, desc: 'User - Counter Decrement' }
        ];

		vm.objTreeUserName = [
			{ name: 'name',            label: 'Display name',                            tagName: 'label0',     numItem: 1, size: 32, disp: 'basic', c_code: 'char name[32]',                                           desc: 'Label: Display name' },
			{ name: 'userId',          label: 'User id',                                 tagName: 'dword1',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long user_number',                               desc: 'Reference in USER Table' },
        ];
		vm.objTreeUserGuid = [
            { name: 'userGuid',        label: 'User GUID',                               tagName: 'guid0',      numItem: 1, size: 16, disp: 'adv',   c_code: 'char user_guid[16]',                                      desc: 'Guid' },
		];

		vm.objType = {
			name: 'User',
			objTypeTag: 'user',
			desc: 'Object type User',
			objTypeId: 11,
            disp: 'basic',
			group: 'Global',
			numObjIdDflt: 10000,
			objRecTbl: [{ name: 'config',       label: 'Configuration',            recTag: 'cfg',       tblTags: vm.objRecCfg,          desc: 'Object configuration data' },
                        { name: 'location',     label: 'User location',            recTag: 'loc',       tblTags: vm.objRecLoc,          desc: 'User location data'        },
                        { name: 'status',       label: 'Status',                   recTag: 'status',    tblTags: vm.objRecStatus,       desc: 'Object status data'        }],
            objCmdTbl: [{ name: 'locationSet',  label: 'Set user location',        recTag: 'loc_set',   tblTags: vm.objCmdLocSet,       desc: 'Set user location'         },
                        { name: 'update',       label: 'Update status',            recTag: 'update',    tblTags: vm.objCmdUpdateStatus, desc: 'Update status'             },
                        { name: 'set',          label: 'Set counter value',        recTag: 'set',       tblTags: vm.objCmdSetCount,     desc: 'Set counter value'         },
                        { name: 'resetAreaLoc', label: 'Reset area user location', recTag: 'loc_reset', tblTags: vm.objCmdAreaLocReset, desc: 'Reset area user location'  }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: [{ name: 'firstName',  label: 'First name',        recTag: 'user_first_name', tblTags: vm.objTreeUserName,    desc: 'Search by first name' },
                         { name: 'lastName',   label: 'Last name',         recTag: 'user_last_name',  tblTags: vm.objTreeUserName,    desc: 'Search by last name' },
                         { name: 'userGuid',   label: 'User GUID',         recTag: 'user_guid',       tblTags: vm.objTreeUserGuid,    desc: 'Search by user GUID' }]
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
