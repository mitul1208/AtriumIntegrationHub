(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_HARDWARE
	app.controller('ObjTypeCtrl_Hardware', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecPriv = [
			{ name: 'adjust12V', label: 'Adjust 12V', tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'long adjust_12V', desc: '' },
			{ name: 'adjust5V',  label: 'Adjust 5V',  tagName: 'dword1', numItem: 1, size: 4, disp: 'basic', c_code: 'long adjust_5V',  desc: '' },
		];

		vm.objEvt = [
			{ id: 0, desc: 'Hardware - Cold start' },
			{ id: 1, desc: 'Hardware - Warm start' }
		];

		vm.objType = {
			name: 'Hardware',
			objTypeTag: 'hardware',
			desc: 'Object type Hardware',
			objTypeId: 34,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 1,
			objRecTbl: [{ name: 'private', label: 'Private', 	   recTag: 'private',  tblTags: vm.objRecPriv,   desc: 'Object private data' }],
			objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
