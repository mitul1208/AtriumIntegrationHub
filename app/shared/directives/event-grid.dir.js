(function(){

    angular.module("atDirectives").directive("atEventGrid", ["$atHub", "$atSession", function ($atHub, $atSession) {
        "use strict";

        return {
            restrict: "E",
            scope: {
                isExpanded: "@",
                firstLastUse: "@",
                objType: "@",
                objId: "@",
                objSerial: "@"
            },
            templateUrl: "templates/event-grid.html",
            link: function (scope, element, attrs) {
                
                scope.isProcessing = true;

                scope.retrieve = function (page) {
                    scope.pageSize = $atSession.getEventPageSize() || 15;

                    scope.isProcessing = true;
                    var data = {
                        event_size: scope.pageSize,
                        event_page_nb: page || 1,
                        event_obj_type: scope.objType,
                        event_obj_id: scope.objId,
                        event_serial: scope.objSerial
                    };

                    $atHub.get("events.xml?" + $.param(data), function (object) {
                        scope.isProcessing = false;
                        scope.model = object.EVENTS;
                        scope.pagedInfo = {
                            page: object.EVENTS.FOOTER._cur_page,
                            totalPage: Math.ceil(object.EVENTS.FOOTER._total_items / object.EVENTS.FOOTER._per_page)
                        }
                    });
                }

                scope.onShow = function () {
                    scope.retrieve();
                }

                scope.onPaging = function (page) {
                    scope.retrieve(page);
                }

                scope.print = function () {
                    window.print();
                }

                scope.setPageSize = function(size) {
                    $atSession.setEventPageSize(size);
                    scope.retrieve();
                }

            }
        }
    }]);

})();