(function () {
    'use strict';

    angular.module('app')
        .service('userService', ['$http', 'appConfig', 'CommonCallback', 'alertModalFactory', 'md5', '$sessionStorage', 'setupFactory', userService]);

    function userService($http, appConfig, CommonCallback, alertModalFactory, md5, $sessionStorage, setupFactory) {
        var token = "1"; //$sessionStorage.user.token;
        var http = {
            'login': function (data) {
                return setupFactory.servicePost('/authen/postLogin', data);
            },
            'changePassword': function (data) {
                return setupFactory.servicePost('/admin/postChangePassword', data);
            },
            'postSearchUser': function (data) {
                return setupFactory.servicePost('/admin/postSearchUser', data);
            },
            'postAddUser': function (data) {
                return setupFactory.servicePost('/admin/postAddUser', data);
            },
            'getUserByUserId': function (userId) {
                return setupFactory.serviceGet('/admin/getUserByUserId/', userId);
            },
            'postUpdateUser': function (data) {
                return setupFactory.servicePost('/admin/postUpdateUser', data);
            },
            'postCancelUser': function (data){
                return setupFactory.servicePost('/admin/postCancelUser', data);
            }
        }

        function login(users, successCallBack) {
            var _user = angular.copy(users);
            _user.password = md5.createHash(_user.password);
            $http(http.login(_user))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function changePassword(user, successCallBack) {
            var _user = angular.copy(user);
            _user.password = md5.createHash(_user.password);
            _user.newPassword = md5.createHash(_user.newPassword);
            _user.confirmPassword = md5.createHash(_user.confirmPassword);

            $http(http.changePassword(_user))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postSearchUser(condition, successCallBack) {
            $http(http.postSearchUser(condition))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postAddUser(user, successCallBack) {
            var _user = angular.copy(user);
            _user.password = md5.createHash(_user.password);
            $http(http.postAddUser(_user))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getUserByUserId(userId, successCallBack) {
            $http(http.getUserByUserId(userId))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postUpdateUser(user, successCallBack) {
            $http(http.postUpdateUser(user))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postCancelUser(user, successCallBack){
            $http(http.postCancelUser(user))
            .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        return {
            login: login,
            changePassword: changePassword,
            postSearchUser: postSearchUser,
            postAddUser: postAddUser,
            getUserByUserId: getUserByUserId,
            postUpdateUser: postUpdateUser,
            postCancelUser: postCancelUser
        }
    }
})();