(function () {
    'use strict';

    angular.module('app.common')
        .controller('alertModalController', ['$scope', 'config', '$uibModalInstance', alertModalController])
        .factory('setupFactory', ['appConfig', '$sessionStorage', setupFactory])

    function alertModalController($scope, config, $modalInstance) {
        //variable
        $scope.mode = config.mode;
        $scope.text = config.text;

        //function
        $scope.close = close;

        function close() {
            $modalInstance.close();
        }
    }

    function setupFactory(appConfig, $sessionStorage) {

        //variable 
        // var token = $sessionStorage.user.token;
        var token = "1";

        function serviceGet(url, data, data2, data3, data4) {

            var _url = appConfig.apiUrl + url;
            if (data != undefined) {
                _url += data;
            }
            if (data2 != undefined) {
                _url += ("/" + data2);
            }
            if (data3 != undefined) {
                _url += ("/" + data3);
            }
            if (data4 != undefined) {
                _url += ("/" + data4);
            }
            return {
                method: 'GET',
                url: _url,
                headers: {
                    token: token
                }
            };
        }

        function servicePost(url, data) {
            return {
                method: 'POST',
                url: appConfig.apiUrl + url,
                headers: {
                    token: token
                },
                data: data
            }
        }

        function serviceDelete(url, data) {
            return {
                method: 'DELETE',
                url: appConfig.apiUrl + url + data,
                headers: {
                    token: token
                }
            }
        }

        function initialDatePicker(e) {
            e.format = "dd/MM/yyyy";
            e.today = function () {
                e.dt = new Date
            }, e.today(), e.clear = function () {
                e.dt = null
            }, e.disabled = function (e, t) {
                // return "day" === t && (0 === e.getDay() || 6 === e.getDay())
            }, e.toggleMin = function () {
                // e.minDate = e.minDate ? null : new Date
            }, e.toggleMin(), e.maxDate = new Date(2020, 5, 22), e.open1 = function () {
                e.popup1.opened = !0
            }, e.open2 = function () {
                e.popup2.opened = !0
            }, e.open3 = function () {
                e.popup3.opened = !0
            }, e.open4 = function () {
                e.popup4.opened = !0
            }, e.setDate = function (t, a, n) {
                e.dt = new Date(t, a, n)
            }, e.dateOptions = {
                formatYear: "yy",
                startingDay: 1,
                showWeeks: 'false'
            }, e.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], e.altInputFormats = ["M!/d!/yyyy"], e.popup1 = {
                opened: !1
            }, e.popup2 = {
                opened: !1
            }, e.popup3 = {
                opened: !1
            }, e.popup4 = {
                opened: !1
            };
            var t = new Date;
            t.setDate(t.getDate() + 1);
            var a = new Date;
            a.setDate(t.getDate() + 1), e.events = [{
                date: t,
                status: "full"
            }, {
                date: a,
                status: "partially"
            }], e.getDayClass = function (t, a) {
                if ("day" === a)
                    for (var n = new Date(t).setHours(0, 0, 0, 0), o = 0; o < e.events.length; o++) {
                        var i = new Date(e.events[o].date).setHours(0, 0, 0, 0);
                        if (n === i) return e.events[o].status
                    }
                return ""
            }
        }
        return {
            serviceGet: serviceGet,
            servicePost: servicePost,
            serviceDelete: serviceDelete,
            initialDatePicker: initialDatePicker
        }
    }
})();