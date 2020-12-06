(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_FLOOR
	app.controller('ObjTypeCtrl_CentaurSvr', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'objStatus',                label: 'Object status',                tagName: 'obj_status', numItem: 1, size: 1,  disp: 'basic', c_code: 'char obj_status',                   desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
			{ name: 'valid',                    label: 'Valid',                        tagName: 'valid',      numItem: 1, size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Active' },
			{ name: 'readOnly',                 label: 'Read only',                    tagName: 'ro',         numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Read-Only' },
			{ name: 'cantBeDeleted',            label: 'Cannot be deleted',            tagName: 'protect',    numItem: 1, size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',     desc: 'Entity Flag: Protected' },
			{ name: 'label',                    label: 'Display name',                 tagName: 'label2',     numItem: 1, size: 64, disp: 'basic', c_code: 'char label[64]',                    desc: 'Label: Display name' },
			{ name: 'tcpPort',                  label: 'TCP Port',                     tagName: 'word3',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short TcpPort',            desc: 'TCP port of the centaur server' },
			{ name: 'busAddr',                  label: 'Bus Address',                  tagName: 'byte4',      numItem: 1, size: 1,  disp: 'basic', c_code: 'char BusAddr',                      desc: 'Address of the centaur controller' }
        ];

        vm.objRecStatus = [
			{ name: 'evtNumber',                label: 'Event number',                 tagName: 'dword0',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long EvtNumberLast',           desc: 'Last transmitted event id' }
		];

		vm.objType = {
			name: 'Centaur Server',
			objTypeTag: 'centaur_svr',
			desc: 'Object type Centaur Server',
			objTypeId: 205,
            disp: 'basic',
			group: 'Local',
			numObjIdDflt: 1,
            objRecTbl: [{ name: 'config', label: 'Configuration',   recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',          recTag: 'status',   tblTags: vm.objRecStatus,    desc: 'Object status data'        }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
