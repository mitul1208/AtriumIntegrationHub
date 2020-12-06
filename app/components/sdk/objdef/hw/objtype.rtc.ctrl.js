(function() {

    var app = angular.module('atControllers');

    // OBJ_TYPE_RTC
    app.controller('ObjTypeCtrl_Rtc', function($sdkObjTypeSvc) {
        "use strict";

        var vm = this;

        vm.objRecCfg = [
            { name: 'objStatus', label: 'Object status', tagName: 'obj_status', numItem: 1, size: 1, disp: 'basic', c_code: 'char obj_status', desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
            { name: 'valid', label: 'Valid', tagName: 'valid', numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active' },
            { name: 'readOnly', label: 'Read only', tagName: 'ro', numItem: 1, size: 1, disp: 'adv', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
            { name: 'cantBeDeleted', label: 'Cannot be deleted', tagName: 'protect', numItem: 1, size: 1, disp: 'adv', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
            { name: 'guid', label: 'GUID', tagName: 'guid1', numItem: 1, size: 16, disp: 'adv', c_code: 'char guid[16]', desc: 'Guid' },
            { name: 'label', label: 'Display name', tagName: 'label2', numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]', desc: 'Label: Display name' },
            { name: 'timeZone', label: 'Time zone', tagName: 'dword3', numItem: 1, size: 4, disp: 'basic', c_code: 'signed long time_zone', desc: 'Time zone (offset in seconds)' },
            { name: 'dlstStartDayMth', label: 'Daylight saving time - Start - Day of month', tagName: 'byte4', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_start.day_of_month', desc: 'Daylight saving time - Start - Day of month' },
            { name: 'dlstStartMth', label: 'Daylight saving time - Start - Month', tagName: 'byte5', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_start.month', desc: 'Daylight saving time - Start - Month' },
            { name: 'dlstStartDayWk', label: 'Daylight saving time - Start - Day of week', tagName: 'byte6', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_start.day_of_week', desc: 'Daylight saving time - Start - Day of week' },
            { name: 'dlstStartHr', label: 'Daylight saving time - Start - Hour', tagName: 'byte7', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_start.hour', desc: 'Daylight saving time - Start - Hour' },
            { name: 'dlstStartMin', label: 'Daylight saving time - Start - Minute', tagName: 'byte8', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_start.min', desc: 'Daylight saving time - Start - Minute' },
            { name: 'dlstEndDayMth', label: 'Daylight saving time - End - Day of month', tagName: 'byte9', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_stop.day_of_month', desc: 'Daylight saving time - End - Day of month' },
            { name: 'dlstEndMth', label: 'Daylight saving time - End - Month', tagName: 'byte10', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_stop.month', desc: 'Daylight saving time - End - Month' },
            { name: 'dlstEndDayWk', label: 'Daylight saving time - End - Day of week', tagName: 'byte11', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_stop.day_of_week', desc: 'Daylight saving time - End - Day of week' },
            { name: 'dlstEndHr', label: 'Daylight saving time - End - Hour', tagName: 'byte12', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_stop.hour', desc: 'Daylight saving time - End - Hour' },
            { name: 'dlstEndMin', label: 'Daylight saving time - End - Minute', tagName: 'byte13', numItem: 1, size: 1, disp: 'basic', c_code: 'char dlst_stop.min', desc: 'Daylight saving time - End - Minute' },
            { name: 'dlstOffset', label: 'Daylight saving time - Offset', tagName: 'dword14', numItem: 1, size: 4, disp: 'basic', c_code: 'signed long dslt_offset', desc: 'Daylight saving time - Offset (in seconds)' },
        ];

        vm.objRecStatus = [
            { name: 'timeUtc', label: 'Time UTC', tagName: 'utc_time0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long TimeUtc', desc: 'Time UTC' },
            { name: 'timeLocal', label: 'Time Local', tagName: 'loc_time1', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long TimeLocal', desc: 'Time Local' },
        ];

        vm.objRecStatus2 = [
            { name: 'dlsState', label: 'Daylight Saving Status', tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char DaylightSavingState', desc: 'DLS state: 0 = off; 1 = on; 0xFF = unknown (first boot-up)' },
        ];

        vm.objCmdSet = [
            { name: 'timeUtc', label: 'Time UTC', tagName: 'utc_time0', numItem: 1, size: 4, disp: 'basic', c_code: '', desc: '' }, // unsigned long TimeUtc;
        ];

        vm.objRecPrivate = [
            { name: 'control', label: 'Control', tagName: 'control', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned char control', desc: 'RTC frequency adjust' },
        ];

        vm.objEvt = [
            { id: 0, desc: 'RTC - Refresh' },
            { id: 1, desc: 'RTC - Change' },
            { id: 2, desc: 'RTC - Lost' },
            { id: 3, desc: 'RTC - Midnight' },
            { id: 4, desc: 'RTC - Daylight Saving Ended' },
            { id: 5, desc: 'RTC - Daylight Saving Started' }
        ];

        vm.objType = {
            name: 'Real Time Clock (RTC)',
            objTypeTag: 'rtc',
            desc: 'Object type Real Time Clock',
            objTypeId: 18,
            disp: 'adv',
            group: 'Local',
            numObjIdDflt: 1,
            objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg', tblTags: vm.objRecCfg, desc: 'Object configuration data' },
                        { name: 'status', label: 'Status Time', recTag: 'status', tblTags: vm.objRecStatus, desc: 'Object status data - Time' },
                        { name: 'status2', label: 'Status DLS', recTag: 'status2', tblTags: vm.objRecStatus2, desc: 'Object status data - DLS' },
                        { name: 'private', label: 'Private', recTag: 'private', tblTags: vm.objRecPrivate, desc: 'Object private configuration' }
            ],
            objCmdTbl: [{ name: 'refresh',      label: 'Refresh',       recTag: 'refresh', tblTags: null, desc: 'Refresh time' },
                        { name: 'setTime',      label: 'Set time',      recTag: 'set',     tblTags: vm.objCmdSet, desc: 'Set time UTC' },
                        { name: 'calibEnable',  label: 'Calib Enable',  recTag: 'enable',  tblTags: null, desc: 'Frequency Calibration Enable' },
                        { name: 'calibDisable', label: 'Calib Disable', recTag: 'disable', tblTags: null, desc: 'Frequency Calibration Disable' }
            ],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
        };

        $sdkObjTypeSvc.create(vm.objType);
    });

})();