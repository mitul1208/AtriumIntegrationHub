(function () {

	var app = angular.module('atControllers');

	app.controller('SdkExampleCtrl', ['$rootScope', '$scope', '$timeout', '$sdkXmlSvc',
		function ($rootScope, $scope, $timeout, $sdkXmlSvc) {
		"use strict";

		var vm = this;
		var fileObjList = [{
				name: 'xsd',
				show: false,
				data: null,
				url: "./components/sdk/res/atrium_sdk.xsd",
				onSuccess: onXmlLoadXsd,
				fileName: "atrium_sdk.xsd",
				label: 'XSD file',
				desc: 'XSD file used to counter verify the crafted XML requests.'
			},
			{
				name: 'rqst',
				show: false,
				data: null,
				url: "./components/sdk/res/sdk_rqst.xml",
				onSuccess: onXmlLoadRqst,
				fileName: "sdk_rqst.xml",
				label: 'XML request example',
				desc: 'Typical XML request including records, command and events.'
			},
			{
				name: 'ans',
				show: false,
				data: null,
				url: "./components/sdk/res/sdk_ans.xml",
				onSuccess: onXmlLoadAns,
				fileName: "sdk_ans.xml",
				label: 'XML answer example',
				desc: 'Typical XML answer including records, command and events.'
			},
			{
				name: 'user',
				show: false,
				data: null,
				url: "./components/sdk/res/sdk_ex_user.xml",
				onSuccess: onXmlLoadUser,
				fileName: "sdk_ex_user.xml",
				label: 'SDK example - Add new user',
				desc: 'XML example of the transactions required to add a new user along with new card, code and login to the controller.'
			},
			{
				name: 'acc_lvl',
				show: false,
				data: null,
				url: "./components/sdk/res/sdk_ex_access_level.xml",
				onSuccess: onXmlLoadAccLvl,
				fileName: "sdk_ex_access_level.xml",
				label: 'SDK example - Add new access level group',
				desc: 'XML example of the transactions required to add new holiday/schedule to access level within an access level group.'
			},
			{
				name: 'mdl_cam',
				show: false,
				data: null,
				url: "./components/sdk/res/sdk_ex_module_cam.xml",
				onSuccess: onXmlLoadMdlCam,
				fileName: "sdk_ex_module_cam.xml",
				label: 'SDK example - Add new module camera',
				desc: 'XML example of the transactions required to add a new sub-controller and then bind a new camera to one of its door.'
			}
		];

		function initialize() {
			for (var i = 0; i < vm.fileObjList.length; i++) {
				$sdkXmlSvc.xmlGet(vm.fileObjList[i].url, vm.fileObjList[i].onSuccess);
			}
			vm.loading = false;
		}
		function onXmlLoad(data, name) {
			var fileObj = fileObjGet(name);
			if (null != fileObj) {
				data = $sdkXmlSvc.jsonToXml(data);
				if (null != data){
					fileObj.data = $sdkXmlSvc.xmlPrettify(data);
				}
			}
		}
		function onXmlLoadRqst(data) {
			onXmlLoad(data, "rqst");
		}
		function onXmlLoadAns(data) {
			onXmlLoad(data, "ans");
		}
		function onXmlLoadXsd(data) {
			onXmlLoad(data, "xsd");
		}
		function onXmlLoadUser(data) {
			onXmlLoad(data, "user");
		}
		function onXmlLoadMdlCam(data) {
			onXmlLoad(data, "mdl_cam");
		}
		function onXmlLoadAccLvl(data) {
			onXmlLoad(data, "acc_lvl");
		}
		function onSearchUpdate(e, searchText){
			vm.searchText = searchText;
		}

		var fileObjGet = function(fileName) {
			for (var i = 0; i < vm.fileObjList.length; i++) {
				if (vm.fileObjList[i].name === fileName) {
					return vm.fileObjList[i];
				}
			}
			return null;
		}

		var showFile = function(fileName) {
			for (var i = 0; i < vm.fileObjList.length; i++) {
				if (vm.fileObjList[i].name === fileName) {
					vm.fileObjList[i].show = true;
				} else {
					vm.fileObjList[i].show = false;
				}
			}
		}
		var showFileGet = function() {
			for (var i = 0; i < vm.fileObjList.length; i++) {
				if (vm.fileObjList[i].show === true) {
					return vm.fileObjList[i].data;
				}
			}
			return null;
		}

		$scope.$on("NavSearchCtrl::searchUpdate", onSearchUpdate);

		// Expose public properties
		vm.loading = true;
		vm.fileObjList = fileObjList;
		vm.searchText = "";

		// Expose public methods
		vm.fileObjGet = fileObjGet;
		vm.showFile = showFile;
		vm.showFileGet = showFileGet;

		// Start init
		initialize();

	}]);

})();