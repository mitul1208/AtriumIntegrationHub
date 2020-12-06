(function(){

	var app = angular.module('atControllers');

    app.controller("NavSearchCtrl", ["$rootScope", "$scope",
        function ($rootScope, $scope) {
        "use strict";

        var vm = this;

        function init() {
            onSetList();
            //Tell other controller that we are ready
            $rootScope.$broadcast("NavSearchCtrl::ready");
        }

        function onSetSearch (e, searchText) {
            vm.searchText = searchText;
        }

        function onSetList (e, list) {
            if (list === undefined){
                list = {
                    dropdown: {}
                };
            }
            vm.itemList = {
                numItem: list.numItem || 0,
                numItemMax: list.numItemMax || 0,
                onAdd: list.onAdd || null,
                onDel: list.onDel || null,
                disabledSearch: list.disabledSearch || false,
                isReadonly: list.isReadonly || false,
                dropdown: {
                    list: list.dropdown.list || [],
                    label: list.dropdown.label || "",
                    onSelect: list.dropdown.onSelect || null
                }
            };
        }

        var getLabel = function (label) {
            switch (label){
                case "global_lbl_default_search": return "Search";
                default:
                break;
            }
            // return $atLabel.get(label);
        }
        var onAdd = function () {
            if ($.isFunction(vm.itemList.onAdd)) {
                vm.itemList.onAdd();
            }
        }
        var onDel = function () {
            if ($.isFunction(vm.itemList.onDel)) {
                vm.itemList.onDel();
            }
        }
        var ondropdownSelect = function () {
            if ($.isFunction(vm.itemList.dropdown.onSelect)) {
                vm.itemList.dropdown.onSelect();
            }
        }
        var showAdd = function (){
            return $.isFunction(vm.itemList.onAdd);
        }
        var showDel = function (){
            return $.isFunction(vm.itemList.onDel);
        }
        var showDropdown = function (){
            if ($.isFunction(vm.itemList.dropdown.onSelect)){
                if (vm.itemList.dropdown.list.length > 0){
                    return true;
                }
            }
            return false;
        }

        $scope.$on("NavSearchCtrl::setSearch", onSetSearch);         //This can be updated by another controller
        $scope.$on("NavSearchCtrl::setList", onSetList);           //This can be updated by another controller

        $scope.$watch(function(){
			return vm.searchText;
		}, function(newValue, oldValue){
			$rootScope.$broadcast("NavSearchCtrl::searchUpdate", vm.searchText);
		},
		true);

        // Public interface - var
        vm.searchText = "";
        vm.itemList = {};

        // Public interface - API
        vm.getLabel = getLabel;
        vm.onAdd = onAdd;
        vm.onDel = onDel;
        vm.showAdd = showAdd;
        vm.showDel = showDel;
        vm.ondropdownSelect = ondropdownSelect;

        init();

    }]);

})();