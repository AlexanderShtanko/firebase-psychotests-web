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
    showError(toaster, 'Ошибка подключения');
}

function redirect (path,$rootScope,$location)
{
      $rootScope.$apply(function() {
      $location.path(path);
      console.log($location.path());
 });
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
   $scope.tests=[];
   $scope.addNewTest=function(){
       $location.path("/index/test");
   }

   $scope.editTest=function(testId){
   }

   $scope.removeTest=function(testId){
     swal({
       title: "Вы уверены что хотите удалить тест?",
       text: "Тест удалится безвозвратно!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Да!",
       closeOnConfirm: false},
        function(){
          ConnectService.removeTest(testId).then(function(data){
            swal("Успешно!");
          }).catch(function(error){
            showError(toaster,error.message);
          });
        });
   }

   ConnectService.getTests(
     function(addedTest){
       console.log("addedTest");
       console.log(addedTest.val());
     },
     function(changedTest){
       console.log("changedTest");
       console.log(changedTest.val());
     },
     function(removedTest){
       console.log("removedTest");
       console.log(removedTest.val());
     })
     .then(function(tests){
       console.log("tests");
       console.log(tests.val());

       $scope.tests=tests;
     })
     .catch(function(error){
       console.log(error);
       showError(toaster,error.message);
     });
};

function TestCtrl($scope,$rootScope,$location, ConnectService, StorageService,$stateParams, toaster,$uibModal) {
   $scope.test = new Test();
   $scope.test.info = new TestInfo();
   $scope.test.questions = [];
   $scope.test.results = [];

   function getTest(testId)
   {
     StorageService.getTest(testId)
     .then(function(test){

       $scope.test = test.val();
       
       if($scope.test.info == undefined || $scope.test.info == null)
       {
         $scope.test.info = new TestInfo();
       }

       if($scope.test.questions == undefined || $scope.test.questions == null)
       {
          $scope.test.questions=[];
       }

       if($scope.test.results == undefined || $scope.test.results == null)
       {
          $scope.test.results=[];
       }

     })
     .catch(function(error){
       showError(toaster,error.message);
       redirect("/index/tests",$rootScope,$location);
     });
   }

   if($stateParams.testId!=undefined)
   {
     $scope.testId = $stateParams.testId;
     getTest();
   }
   else {
     $scope.testId = null;
   }


   $scope.saveTest = function(){
       if($scope.testId == null)
       {
            ConnectService.addTest($scope.test).then(function(data){
                console.log(data);
                swal("Отлично!", "Тест был успешно сохранен!", "success");
                redirect("/index/tests",$rootScope,$location);
            }).catch(function(error){
                showError(toaster,error.message);
            });
        }
        else {
          ConnectService.updateTest($scope.testId, $scope.test).then(function(data){
            swal("Отлично!", "Тест был успешно сохранен!", "success");
            $rootScope.$apply(function() {
                $location.path("/index/tests");
                console.log($location.path());
           });
          }).catch(function(error){
              showError(toaster,error.message);
          });
        }
      };



   $scope.addQuestion = function()
   {
        if($scope.test.questions == undefined || $scope.test.questions == null)
        {
           $scope.test.questions=[];
        }

        var question = new TestQuestion();
        $scope.addVariant(question);
        $scope.test.questions.push(question);
   };

    $scope.removeQuestion = function(index)
   {
       $scope.test.questions.splice(index, 1)
   };

   $scope.addResult = function()
   {
     if($scope.test.results == undefined || $scope.test.results == null)
     {
        $scope.test.results=[];
     }
        var result = new TestResult();
        $scope.test.results.push(result);
   };

    $scope.removeResult = function(index)
   {
       $scope.test.results.splice(index, 1)
   };

   $scope.addVariant = function(question)
   {
      if(question.variants == undefined || question.variants == null)
      {
        question.variants = [];
      }
       question.variants.push(new AnswerVariant())
   }

   $scope.removeVariant = function(question,index)
   {
       question.variants.splice(index, 1)
   };
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
