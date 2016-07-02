/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/tests");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            controller: "IndexCtrl",
            url: "/index",
            templateUrl: "views/common/content.html"
        })
        .state('index.tests', {
            url: "/tests",
            templateUrl: "views/tests.html",
            controller: "TestsCtrl",
            data: {
                pageTitle: 'Тесты'
            }
        })
        .state('index.test', {
            url: "/test/:testId",
            templateUrl: "views/test.html",
            controller: "TestCtrl",
            data: {
                pageTitle: 'Тест'
            }
        })
        .state('index.settings', {
            url: "/settings",
            controller: "SettingsCtrl",
            templateUrl: "views/settings.html",
            data: {
                pageTitle: 'Настройки'
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "LoginCtrl",
            data: {
                pageTitle: 'Вход'
            }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            controller: "RegistrationCtrl",
            data: {
                pageTitle: 'Регистрация'
            }
        })
        .state('forgot', {
            url: "/forgot",
            templateUrl: "views/forgot_password.html",
            controller: "ForgotCtrl",
            data: {
                pageTitle: 'Восстановление пароля'
            }
        })
}


angular
    .module('inspinia').config(function($httpProvider, localStorageServiceProvider) {
        //Reset headers to avoid OPTIONS request (aka preflight)
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        localStorageServiceProvider
            .setPrefix('PsychoTests')
            .setStorageType('localStorage')
            .setNotify(true, true);

    });
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state, StorageService) {
        $rootScope.$state = $state;
    });

angular
    .module('inspinia')
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);

            for (var i = 0; i < total; i++) {
                input.push(i);
            }

            return input;
        };
    });

angular
    .module('inspinia').directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
});

angular
    .module('inspinia').directive('customOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});
