/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'LocalStorageModule',
        'ngResource',
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'cgNotify',
        'ngAnimate',
        'toaster',
        'angularMoment',
        'stefanoschrs.angular-trianglify',
        'ngLetterAvatar',
        'datePicker',
        'ui.select',
        'naif.base64'

    ])
})();
