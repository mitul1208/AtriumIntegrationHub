(function() {

    var app = angular.module('atControllers');

    // OBJ_TYPE_MEMORY_STATUS
    app.controller('ObjTypeCtrl_MemoryStatus', function($sdkObjTypeSvc) {
        "use strict";

        var vm = this;

        vm.objRecStatus = [
            { name: 'drvName', label: 'Drive name', tagName: 'utf0',  numItem: 1, size: 9, disp: 'basic', c_code: 'char DriveName', desc: 'Drive name' },
            { name: 'status',  label: 'Status',     tagName: 'hexv1', numItem: 1, size: 4, disp: 'basic', c_code: 'long status',    desc: 'Mount status: 0 = ok' }
        ];

        vm.objType = {
            name: 'Memory Status',
            objTypeTag: 'memory_status',
            desc: 'Object type Memory Status',
            objTypeId: 215,
            disp: 'adv',
            group: 'Local',
            numObjIdDflt: 6,
            objRecTbl: [{ name: 'status', label: 'Status', recTag: 'status', tblTags: vm.objRecStatus, desc: 'Object status data' }],
            objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
        };

        $sdkObjTypeSvc.create(vm.objType);
    });
})();