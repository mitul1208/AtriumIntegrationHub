(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_SYNC
	app.controller('ObjTypeCtrl_Sync', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

        vm.objRecCfg = [
			{ name: 'objStatus',      label: 'Object status',         tagName: 'obj_status',  numItem: 1,   size: 1,  disp: 'basic', c_code: 'char obj_status',                     desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },/*  */
			{ name: 'valid',          label: 'Valid',                 tagName: 'valid',       numItem: 1,   size: 1,  disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Active' },/*  */
			{ name: 'readOnly',       label: 'Read only',             tagName: 'ro',          numItem: 1,   size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Read-Only' },/*  */
            { name: 'cantBeDeleted',  label: 'Cannot be deleted',     tagName: 'protect',     numItem: 1,   size: 1,  disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag',       desc: 'Entity Flag: Protected' },/*  */
            { name: 'serial',         label: 'Serial',                tagName: 'serial2',     numItem: 1,   size: 4,  disp: 'adv',   c_code: 'unsigned long obj_serial',            desc: '' },/*  */
            { name: 'optMustDelete',  label: 'Option - Must delete',  tagName: 'bit3',        numItem: 20,  size: 1,  disp: 'adv',   c_code: 'unsigned short action.must_delete:1', desc: 'The slave database must be deleted' },
            { name: 'optMustRead',    label: 'Option - Must Read',    tagName: 'bit4',        numItem: 20,  size: 1,  disp: 'adv',   c_code: 'unsigned short action.must_read:1',   desc: 'The slave must be read to update the overwrite the current device database (Cloning this slave)' },
            { name: 'optMustWrite',   label: 'Option - Must Write',   tagName: 'bit5',        numItem: 20,  size: 1,  disp: 'adv',   c_code: 'unsigned short action.must_write:1',  desc: 'The slave database must be writed with the current device database' },
            { name: 'optMustScan',    label: 'Option - Must Scan',    tagName: 'bit6',        numItem: 20,  size: 1,  disp: 'adv',   c_code: 'unsigned short action.must_scan:1',   desc: '' },
            { name: 'indexDelete',    label: 'Index - Delete',        tagName: 'dword7',      numItem: 20,  size: 4,  disp: 'adv',   c_code: 'unsigned long index.delete',          desc: 'Index of delete to start the sync (use for restore setpoint)' },
            { name: 'indexRead',      label: 'Index - Read',          tagName: 'dword8',      numItem: 20,  size: 4,  disp: 'adv',   c_code: 'unsigned long index.write_local_version', desc: '' },
            { name: 'indexWrite',     label: 'Index - Write',         tagName: 'dword9',      numItem: 20,  size: 4,  disp: 'adv',   c_code: 'unsigned long index.write',           desc: 'Index of write to start the sync (use for restore setpoint)' },
            { name: 'versionLocal',   label: 'Version - Local',       tagName: 'dword10',     numItem: 20,  size: 4,  disp: 'adv',   c_code: 'unsigned long version.local',         desc: 'Last Local counter writed to slave' },
            { name: 'versionSlave',   label: 'Version - Slave',       tagName: 'dword11',     numItem: 20,  size: 4,  disp: 'adv',   c_code: 'unsigned long version.slave',         desc: 'Last Slave counter writed to slave' }
        ];

		vm.objEvt = [
            { id: 0, desc: 'Sync - Refresh'          },
            { id: 1, desc: 'Sync - Overload'         },
            { id: 2, desc: 'Sync - Overload restore' }
        ];

		vm.objType = {
			name: 'Sync',
			objTypeTag: 'sync',
			desc: 'Object type Sync',
			objTypeId: 61,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 100,
            objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: [{ name: 'pause',  label: 'Pause Sync',    recTag: 'pause',    tblTags: null,               desc: 'Pause sync' }],
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
