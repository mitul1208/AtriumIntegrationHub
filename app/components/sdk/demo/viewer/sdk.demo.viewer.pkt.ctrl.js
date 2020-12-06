(function(){

	var app = angular.module('atControllers');

	app.controller('SdkDemoViewerPktCtrl', ['$rootScope', '$scope', '$sdkXmlSvc',
		function($rootScope, $scope, $sdkXmlSvc){
		"use strict";

		var vm = this;
		var selectedObj = null;

		function initialize(){
			vm.loading = false;
			$rootScope.$broadcast("SdkDemoViewerPktCtrl::init");
		}
		function onObjViewSelected(e, obj){
			selectedObj = obj;
			if (angular.isDefined(obj)){
				vm.show = true;
			}
			else{
				vm.show = false;
			}
		}

		var close = function(){
			selectedObj = null;
			vm.show = false;
		}
		var getSelectedTransaction = function(){
			if (null != selectedObj){
				var xmlData = '';
				if (null != selectedObj.type){
					xmlData = xmlData + selectedObj.type + ' - ';
				}
				if (true === selectedObj.ans){
					xmlData = xmlData + "Answer to transaction id ";
				}
				else{
					xmlData = xmlData + "Request to transaction id ";
				}
				xmlData = xmlData + selectedObj.trxId;
				return xmlData;
			}
			return null;
		}
		var getSelectedData = function(){
			if (null != selectedObj){
				var xmlData = {};
				xmlData[selectedObj.label] = selectedObj.data;
				xmlData = $sdkXmlSvc.craftSdkFile(xmlData);
				xmlData = $sdkXmlSvc.jsonToXml(xmlData);
				xmlData = $sdkXmlSvc.xmlPrettify(xmlData);
				return xmlData;
			}
            return "Click on a history transaction to display its content."
		}

		// Register events
		$scope.$on("SdkDemoCmdMainCtrl::objViewSelected", onObjViewSelected);
		$scope.$on("SdkDemoEvtMainCtrl::objViewSelected", onObjViewSelected);

		// Expose public properties
		vm.loading = true;
		vm.show = false;

		// Expose public methods
		vm.close = close;
		vm.getSelectedTransaction = getSelectedTransaction;
		vm.getSelectedData = getSelectedData;

		// Init
		initialize();
	}]);

})();