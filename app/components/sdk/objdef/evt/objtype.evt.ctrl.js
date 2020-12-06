(function(){

	var app = angular.module('atControllers');

	// OBJ_TYPE_IPCOM_CLIENT
	app.controller('ObjTypeCtrl_EvtSave', function($sdkObjTypeSvc){
		"use strict";

		var vm = this;

		vm.objRecCfg = [
			{ name: 'snGen',      label: 'Serial generator',        tagName: 'serial0',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long serial_generator', desc: ''                      },
			{ name: 'timeUtc',    label: 'Time UTC',                tagName: 'utc_time1', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long timestamp_UTC',    desc: ''                      },
			{ name: 'timeLoc',    label: 'Time Local',              tagName: 'loc_time2', numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long timestamp_LOCAL',  desc: ''                      },
			{ name: 'trxId',      label: 'Transaction id',          tagName: 'word3',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short transaction_id',  desc: ''                      },
			{ name: 'opt',        label: 'Option flags',            tagName: 'byte4',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char option_flag',      desc: ''                      },
			{ name: 'id',         label: 'Event number',            tagName: 'dword5',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long event_number',     desc: ''                      },
			{ name: 'cmd',        label: 'Command',                 tagName: 'byte6',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'char command',                   desc: ''                      },
			{ name: 'chkSum',     label: 'Checksum',                tagName: 'byte7',     numItem: 1, size: 1,  disp: 'adv',   c_code: 'unsigned char checksum',         desc: ''                      },
			{ name: 'objSn',      label: 'Object serial number',    tagName: 'serial8',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long obj_serial',       desc: ''                      },
			{ name: 'objType',    label: 'Object type',             tagName: 'word9',     numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short obj_type',        desc: ''                      },
			{ name: 'objId',      label: 'Object id',               tagName: 'dword10',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long obj_id',           desc: ''                      },
			{ name: 'objEvt',     label: 'Object event id',         tagName: 'byte11',    numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char obj_event',        desc: ''                      },
			{ name: 'byObjSn',    label: 'By object serial number', tagName: 'serial12',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long by_obj_serial',    desc: 'who caused the event'  },
			{ name: 'byObjType',  label: 'By object type',          tagName: 'word13',    numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short by_obj_type',     desc: 'who caused the event'  },
			{ name: 'byObjId',    label: 'By object id',            tagName: 'dword14',   numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long by_obj_id',        desc: 'who caused the event'  },
			{ name: 'sizeOfData', label: 'Size of extra data',      tagName: 'word15',    numItem: 1, size: 2,  disp: 'adv',   c_code: 'unsigned short size',            desc: 'size of the parameter' },
			{ name: 'extraData',  label: 'Event extra data',        tagName: 'hexa16',    numItem: 1, size: 84, disp: 'adv',   c_code: 'char event_buf[84]',             desc: ''                      }
		];

		vm.objTreeEvtKey = [
			{ name: 'timestampUtc',    label: 'Time stamp UTC',                          tagName: 'utc_time0',  numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long timestamp_UTC',                             desc: 'Time stamp UTC' },
			{ name: 'evtNumber',       label: 'Event number',                            tagName: 'dword1',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long event_number',                              desc: 'Event number' },
			{ name: 'objSerial',       label: 'Object serial',                           tagName: 'serial2',    numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long obj_serial',                                desc: 'Object serial number' },
			{ name: 'objId',           label: 'Object id',                               tagName: 'dword3',     numItem: 1, size: 4,  disp: 'basic', c_code: 'unsigned long obj_id',                                    desc: 'Object ID' },
			{ name: 'objType',         label: 'Object type',                             tagName: 'word4',      numItem: 1, size: 2,  disp: 'basic', c_code: 'unsigned short obj_type',                                 desc: 'Object type' },
            { name: 'keyNumber',       label: 'Key number',                              tagName: 'byte5',      numItem: 1, size: 1,  disp: 'basic', c_code: 'unsigned char key_number',                                desc: 'Key number' },
		];

		vm.objType = {
			name: 'Event Save',
			objTypeTag: 'evt_save',
			desc: 'Object type Event save',
			objTypeId: 17,
            disp: 'adv',
			group: 'Local',
			numObjIdDflt: 25000,
			objRecTbl: [{ name: 'config', label: 'Configuration', recTag: 'cfg',      tblTags: vm.objRecCfg,       desc: 'Object configuration data' }],
			objCmdTbl: null,
            objEvtTbl: null,
            objTreeTbl: [{ name: 'evtKey', label: 'Event key', recTag: 'evt_key',  tblTags: vm.objTreeEvtKey,    desc: 'Search by event key' }]
			};

		$sdkObjTypeSvc.create(vm.objType);
	});

})();
