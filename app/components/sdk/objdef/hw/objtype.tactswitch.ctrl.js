(function() {

    var app = angular.module('atControllers');

    // OBJ_TYPE_AC
    app.controller('ObjTypeCtrl_TactSwitch', ["$sdkObjTypeSvc", function($sdkObjTypeSvc) {
            "use strict";

        var vm = this;

                vm.objRecIoState = [ 
                    { name: 'tactSwitchState', label: 'Tact Switch State', tagName: 'bit0', numItem: 1, size: 1, disp: 'basic', c_code: 'unsigned short tact_switch_io_state.tact_switch_state:1', desc: 'Tact Switch - IO State - Switch State' },
                ];

                vm.objType = {
                    name: 'TACT SWITCH',
                    objTypeTag: 'tact_switch',
                    desc: 'Object type TACT SWITCH',
                    objTypeId: 50,
                    disp: 'adv',
                    group: 'Local',
                    numObjIdDflt: 1,
                    objRecTbl: [{ name: 'io', label: 'Io', recTag: 'io', tblTags: vm.objRecIoState, desc: 'Object IO State'}],
                    objCmdTbl: null,
                    objEvtTbl: null,
                    objTreeTbl: null
                    };

        $sdkObjTypeSvc.create(vm.objType);
    }]);
})();