/**
 * INSPINIA - Responsive Admin Theme
 *
 */
 function showError(toaster,message)
{ 
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: message,
                    showCloseButton: true,
                    timeout: 3000
                });
}
function showConnectionError(toaster)
{
    showError(toaster, 'Connection error');
}

function IndexCtrl($scope, $location, StorageService) {
    $scope.getToken = function () {
        return StorageService.getToken();
    }

    function checkAuth() {
        if (StorageService.getToken() == null) {
            $location.path("/login");
        }
    }

    $scope.$watch('getToken()', function (newValue, oldValue) {
        checkAuth()
    });

    checkAuth();


    $scope.logout = function () {
        StorageService.clear();
        $location.path("/login");
    }
};


function MainCtrl($scope, ConnectService, StorageService,toaster) {
    var self = this;

    this.userName = 'Example user';
    
    this.descriptionText = '';
};

function TestsCtrl($scope, ConnectService, StorageService, toaster,$location,$uibModal) {
   $scope.addNewTest=function(){
       $location.path("/index/test");
   }
};

function TestCtrl($scope, ConnectService, StorageService, toaster,$uibModal) {
   $scope.testId = null;
   $scope.test = new Test();
   $scope.test.info = new TestInfo();
   $scope.test.questions = [];
   $scope.test.results = [];

   $scope.createTest = function(){
       if($scope.testId == null)
       {
            ConnectService.addTest($scope.test).then(function(data){
                console.log(data);
            }).catch(function(error){
                showError(error.message,toaster);
            });
        }
   }

   $scope.updateTest = function(){
       if($scope.testId != null)
       {
            ConnectService.updateTest($scope.testId, $scope.test).then(function(data){
                console.log(data);
            }).catch(function(error){
                showError(error.message,toaster);
            });
        }
   }

  
   $scope.addQuestion = function()
   {
        var question = new TestQuestion();
        $scope.addVariant(question);
        $scope.test.questions.push(question);  
   };

    $scope.removeQuestion = function(index)
   {
       $scope.test.questions.splice(index, 1)
   };

   $scope.addVariant = function(question)
   {
       question.variants.push(new AnswerVariant())
   }

   $scope.removeVariant = function(question,index)
   {
       question.variants.splice(index, 1)
   };

   $scope.addTestResult = function() {
       $scope.results.push(new TestResult());
   }
};

function SettingsCtrl($scope, StorageService,$uibModal) {

   
    $scope.openProfileDialog = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/dialog_profile.html',
            controller: ProfileDialogCtrl
        });
    };

};

function DatepickerDialogCtrl($scope, $uibModalInstance)
{
    $scope.date = new Date();
    $scope.ok = function () {
        var date = new Date(Date.parse($scope.date));
        console.log(date);
        $uibModalInstance.result = date;
        $uibModalInstance.close(date);
    }
}

function ProfileDialogCtrl($scope,ConnectService, StorageService,$uibModalInstance)
{
  //showConnectionError(toaster);
  //swal("Success!", "Profile was updated successfully!", "success");
}

function RegistrationCtrl($scope,$rootScope,$location, ConnectService,StorageService) {
    $scope.email = "";
    $scope.password = "";
    $scope.passwordRepeat = "";
  
    $scope.doSubmit = function () {
        var email = $scope.email;
        var password = $scope.password;
        var passwordRepeat = $scope.passwordRepeat;
       
        if(password!==passwordRepeat)
        {
            $scope.err = "Пароли не совпадают";
            return;
        }

        ConnectService.register(email, password).then(function (data) {
            console.log(data);
            StorageService.setToken(data.refreshToken);
            $rootScope.$apply(function() {
                 $location.path("/index");
                 console.log($location.path());
            });
        }).catch(function (error){
            $scope.err = error.message;
        });

    };
}

function LoginCtrl($scope,$rootScope, $location, ConnectService, StorageService) {
    $scope.email = "";
    $scope.password = "";
  
    $scope.doSubmit = function () {
        var email = $scope.email;
        var password = $scope.password;

        ConnectService.login(email, password).then(function (data) {
             console.log(data);
             StorageService.setToken(data.refreshToken);
             $rootScope.$apply(function() {
                 $location.path("/index");
                 console.log($location.path());
            });
           
        }).catch(function (error){
            $scope.err = error.message;
        });

    };
}

function ForgotCtrl($scope, ConnectService) {
}

angular
    .module('inspinia')
    .controller('IndexCtrl', IndexCtrl)
    .controller('MainCtrl', MainCtrl)
    .controller('TestsCtrl', TestsCtrl)
    .controller('TestCtrl', TestCtrl)
    .controller('SettingsCtrl', SettingsCtrl)
    .controller('LoginCtrl', LoginCtrl)
    .controller('RegistrationCtrl', RegistrationCtrl)
    .controller('ProfileDialogCtrl', ProfileDialogCtrl)
    .controller('DatepickerDialogCtrl', DatepickerDialogCtrl)

