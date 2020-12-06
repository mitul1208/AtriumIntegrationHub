(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_AC
	app.controller('ObjTypeCtrl_Selftest', ["$sdkObjTypeSvc", function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecStatus = [
            { name: 'active',    label: 'active',    tagName: 'byte0', numItem: 1, size: 1, disp: 'basic', c_code: 'char active',    desc: 'Selftest active: 0=off; 1=on' },
            { name: 'available', label: 'available', tagName: 'byte1', numItem: 1, size: 1, disp: 'basic', c_code: 'char available', desc: 'Selftest available: 0=off; 1=on' }
		];

        vm.objCmd_0 = [
            { name: 'passPhrase', label: 'Passphrase', tagName: 'utf0', numItem: 1, size: 256, disp: 'b', c_code: 'char Passphrase[]', desc: 'Passphrase to start the selftest' }
        ];

        vm.objCmd_1 = [
            { name: 'drvName', label: 'Drive Name', tagName: 'utf0', numItem: 1, size: 256, disp: 'b', c_code: 'char DriveName[]', desc: 'Drive name to format' }
        ];

		vm.objType = {
			name: 'Selftest',
			objTypeTag: 'selftest',
			desc: 'Object type Selftest',
			objTypeId: 41,
            disp: 'adv',      // 'advanced'
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'status',    label: 'Status', 		recTag: 'status', id: 1, tblTags: vm.objRecStatus, desc: 'Object status data' }],
            objCmdTbl: [{ name: 'start',     label: 'Start',        recTag: 'start',  id: 0, tblTags: vm.objCmd_0,     desc: 'Start selftest mode' },
                        { name: 'drvFormat', label: 'Drive Format', recTag: 'format', id: 1, tblTags: vm.objCmd_1,     desc: 'Format a Drive' }],
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	}]);

})();
