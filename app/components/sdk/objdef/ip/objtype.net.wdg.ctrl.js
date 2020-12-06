(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_IPCOM_CLIENT
	app.controller('ObjTypeCtrl_NetWdg', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',                  label: 'Object status',                       tagName: 'obj_status', numItem: 1, size: 1,   disp: 'basic', c_code: 'char obj_status',                          desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                      label: 'Valid',                               tagName: 'valid',      numItem: 1, size: 1,   disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',            desc: 'Entity Flag: Active' },
			{ name: 'readOnly',                   label: 'Read only',                           tagName: 'ro',         numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',            desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',              label: 'Cannot be deleted',                   tagName: 'protect',    numItem: 1, size: 1,   disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',            desc: 'Entity Flag: Protected' },
			{ name: 'label',                      label: 'Display name',                        tagName: 'label2',     numItem: 1, size: 64,  disp: 'basic', c_code: 'unsigned char label[64]',                  desc: 'Label: Display name' },
            { name: 'pingDelay_sec',              label: 'Ping Delay (sec)',                    tagName: 'dword3',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long PingDelay_sec',              desc: 'Delay between each polling attempt: 0 = disabled' },
            { name: 'failDebounceDelay_sec',      label: 'Fail Debounce Delay (sec)',           tagName: 'dword4',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long FailDebounceDelay_sec',      desc: 'Delay before declaring failure: 0 = disabled' },
            { name: 'rebootDebounceDelay_sec',    label: 'Reboot Debounce Delay (sec)',         tagName: 'dword5',     numItem: 1, size: 4,   disp: 'basic', c_code: 'unsigned long RebootDebounceDelay_sec',    desc: 'Delay before rebooting from failure state: 0 = disabled' },
            { name: 'delayToResetNumFail_sec',    label: 'Delay To Reset Number of Fail (sec)', tagName: 'dword6',     numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long DelayToResetNumFailure_sec', desc: 'Defines the no failure period after which the NumConsecFailure status will be cleared: 0 = disabled' },
			{ name: 'ipAddr',                     label: 'IP Address',                          tagName: 'ip7',        numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long IpAddr',                     desc: 'IP Address to ping' },
            { name: 'ipPort',                     label: 'IP Port',                             tagName: 'word8',      numItem: 1, size: 2,   disp: 'adv',   c_code: 'unsigned short IpPort',                    desc: 'IP Port to ping' },
            { name: 'pingMode',                   label: 'Ping Mode',                           tagName: 'byte9',      numItem: 1, size: 1,   disp: 'basic', c_code: 'unsigned char PingMode',                   desc: 'Ping mode: 0=Disabled; 1=Gateway; 2=WebPage; 3=AtriumRecord; 4=AtriumDiscovery; 5=TCP; 6=HTTP' },
			{ name: 'serial',                     label: 'Serial number',                       tagName: 'serial0',    numItem: 1, size: 4,   disp: 'adv',   c_code: 'unsigned long SerialNumber',               desc: 'Atrium serial number to reach using Ping mode NETWDG_PING_MODE_ATRIUM' },
			{ name: 'url',                        label: 'URL',                                 tagName: 'url11',      numItem: 1, size: 128, disp: 'adv',   c_code: 'char Url[128]',                            desc: 'URL to ping' }
        ];
		vm.objRecStatusReboot = [
            { name: 'numFailReboot',      label: 'Number of Fail Reboot',  tagName: 'dword0',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long NumFailReboot',      desc: 'Number of consecutive reboot due to failure on this destination' },
            { name: 'lastFailReboot_UTC', label: 'Last Fail Reboot (UTC)', tagName: 'utc_time1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long LastFailReboot_UTC', desc: 'Time of the last reboot' }
        ];
		vm.objRecStatusLive = [
            { name: 'numSuccess',       label: 'Number of Success',    tagName: 'dword0',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long NumSuccess',       desc: 'Number of success (reset at boot-up)' },
            { name: 'lastPingOK_UTC',   label: 'Last Ping OK (UTC)',   tagName: 'utc_time1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long LastPingOK_UTC',   desc: 'Time of the last ping OK' },
            { name: 'numFailure',       label: 'Number of Failure',    tagName: 'dword2',    numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long NumFailure',       desc: 'Number of failures (reset at boot-up)' },
            { name: 'lastPingFail_UTC', label: 'Last Ping Fail (UTC)', tagName: 'utc_time3', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long LastPingFail_UTC', desc: 'Time of the last ping fail' },
            { name: 'lastPing_UTC',     label: 'Last Ping (UTC)',      tagName: 'utc_time4', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long LastPing_UTC',     desc: 'Time of the last ping' },
            { name: 'lastPingStatus',   label: 'Last Ping Status',     tagName: 'byte5',     numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char LastPingStatus',   desc: 'Last ping status: 0=Disabled; 1=OK; 2=Fail' }
        ];

		vm.objType = {
			name: 'Network Watchdog',
			objTypeTag: 'net_wdg',
			desc: 'Object type Network Watchdog',
			objTypeId: 80,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 4,
			objRecTbl: [{ name: 'config',       label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,          desc: 'Object configuration data'      },
                        { name: 'status',       label: 'Status Reboot', recTag: 'status',   tblTags: vm.objRecStatusReboot, desc: 'Object status reboot data'      },
                        { name: 'status2',      label: 'Status Live',   recTag: 'status2',  tblTags: vm.objRecStatusLive,   desc: 'Object status live data'        }],
            objCmdTbl: [{ name: 'forcePing',    label: 'Force Ping',    recTag: 'generate', tblTags: null,                  desc: 'Force Ping request'             },
                        { name: 'resetReboot',  label: 'Reset Reboot',  recTag: 'reset',    tblTags: null,                  desc: 'Reset status reboot'            },
                        { name: 'resetLive',    label: 'Reset Live',    recTag: 'restart',  tblTags: null,                  desc: 'Reset status live'              }],
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
