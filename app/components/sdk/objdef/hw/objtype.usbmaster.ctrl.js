(function() {

    var app = angular.module('atControllers');

    // OBJ_TYPE_USB_MASTER
    app.controller('ObjTypeCtrl_UsbMaster', function($sdkObjTypeSvc) {
        "use strict";

        var vm = this;

        vm.objRecCfg = [
            { name: 'objStatus',     label: 'Object Status',        tagName: 'obj_status', numItem: 1, size: 1, disp: 'basic', c_code: 'char obj_status', 			    desc: 'Object Status: Free(0xFF), Used(0x01), Deleted(0x00)' },
            { name: 'valid',         label: 'Valid',                tagName: 'valid',      numItem: 1, size: 1, disp: 'basic', c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Active'    },
            { name: 'readOnly',      label: 'Read only',            tagName: 'ro',         numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Read-Only' },
            { name: 'cantBeDeleted', label: 'Cannot be deleted',    tagName: 'protect',    numItem: 1, size: 1, disp: 'adv',   c_code: 'L008_EntityFlag_t entity_flag', desc: 'Entity Flag: Protected' },
            { name: 'label',         label: 'Display name',         tagName: 'label2',     numItem: 1, size: 1, disp: 'basic', c_code: 'char label[64]',                desc: 'Label: Display name'    },
        ];

        vm.objRecStatus = [
            { name: 'totalSector',      label: 'Total Sectors',     tagName: 'dword0', numItem: 1, size: 4, disp: 'basic', c_code: 'unsigned long total_sectors',      desc: '' },
            { name: 'directoryEntries', label: 'Directory Entries', tagName: 'word1',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short directory_entries', desc: '' },
            { name: 'hiddenSectors',    label: 'Hidden Sectors',    tagName: 'word2',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short hidden_sectors',    desc: '' },
            { name: 'bytesPerSector',   label: 'Bytes Per Sector',  tagName: 'word3',  numItem: 1, size: 2, disp: 'basic', c_code: 'unsigned short bytes_per_sector',  desc: '' },
        ];

        vm.objEvt = [
            { id: 0, desc: 'Usb Master - Device Plugged In' },
            { id: 1, desc: 'Usb Master - Device Plugged Out' }
        ];
        vm.objType = {
            name: 'Usb Master',
            objTypeTag: 'usb_master',
            desc: 'Object type Usb Master',
            objTypeId: 214,
            disp: 'adv',
            group: 'Local',
            numObjIdDflt: 1,
            objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',    tblTags: vm.objRecCfg,    desc: 'Object configuration data' },
                        { name: 'status', label: 'Status',        recTag: 'status', tblTags: vm.objRecStatus, desc: 'Object status data'        }],
            objCmdTbl: null,
            objEvtTbl: vm.objEvt,
            objTreeTbl: null
        };

        $sdkObjTypeSvc.create(vm.objType);
    });
})();