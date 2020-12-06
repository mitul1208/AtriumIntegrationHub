(function () {

	var app = angular.module('atControllers');

	app.factory('$sdkTagDataSvc', function () {
        "use strict";

        var objStatusTbl = ["used", "free", "deleted" ];

        function attrTagClean(attr){
            var idxStart = attr.search("[0-9]");           // Trim ending _[0-9]
            if (idxStart > 0){
                attr = attr.substr(0, idxStart);
            }
            return attr;
        }

        var objStatusTblGet = function(){
            return objStatusTbl;
        }

        var objFormatGet = function(tagName) {
            var obj = {
                format: "text",
                extended: false,
                disabled: false
            };
            tagName = attrTagClean(tagName);

            if ((tagName == "byte") ||
                (tagName == "word") ||
                (tagName == "dword") ||
                (tagName == "cnt") ||
                (tagName == "id")){
                obj.format = "number";
            }
            else if ((tagName == "hexv") ||
                    (tagName == "hexa") ||
                    (tagName == "serial") ||
                    (tagName == "guid")){
                obj.format = "hex";
                if (tagName == "guid"){
                obj.extended = true;
                }
            }
            else if ((tagName == "utf") ||
                    (tagName == "label") ||
                    (tagName == "obj_type")){
                obj.format = "text";
            }
            else if (tagName == "bit_field"){
                obj.format = "bitField";
            }
            else if ((tagName == "bit") ||
                    (tagName == "valid") ||
                    (tagName == "protect") ||
                    (tagName == "ro")){
                obj.format = "bit";
                if ((tagName == "protect") ||
                    (tagName == "ro")){
                    obj.disabled = true;
                }
            }
            else if ((tagName == "loc_time") ||
                    (tagName == "utc_time")){
                obj.format = "time";
            }
            else if (tagName == "obj_status"){
                obj.format = "objStatus";
            }
            else if ((tagName == "ip") ||
                    (tagName == "email") ||
                    (tagName == "url") ||
                    (tagName == "pswd") ||
                    (tagName == "key")){
                obj.format = tagName;
            }
            return obj;
        };

		//Public Interface
		return {
			objFormatGet: objFormatGet,
            objStatusTblGet: objStatusTblGet
		};
	});

})();

