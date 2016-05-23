/**
 * Created by aleksandr on 13.03.16.
 */

app.service("ConnectService", function ($resource, StorageService, $http) {
    var self = this;

    this.login = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    this.register = function (email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    this.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };

    this.logout = function () {
        return firebase.auth().signOut();
    };

    this.addTest = function (test) {
        return firebase.database().ref().child("tests").push(angular.copy(test));

    };

    this.removeTest = function (testId) {
        var testRef = firebase.database().ref("tests/"+testId);
        return testRef.remove();
    };

    this.getTest = function (testId) {
        var testRef = firebase.database().ref("tests/"+testId);
        return testRef.once('value');
    };

    this.updateTest = function (testId,test) {
        var testRef = firebase.database().ref("tests/"+testId);
        return testRef.set(angular.copy(test));
    };


    this.getQuestions = function (testId, callbackAdded, callbackChanged, callbackRemoved) {
        var questionsRef = firebase.database().ref('tests/'+testId+"/questions");
        questionsRef.on('child_added', callbackAdded);
        questionsRef.on('child_changed', callbackChanged);
        questionsRef.on('child_removed', callbackRemoved);
        return questionsRef.once('value');
    };

    this.getTests = function (callbackAdded, callbackChanged, callbackRemoved) {
        var testsRef = firebase.database().ref('tests');
        testsRef.on('child_added', callbackAdded);
        testsRef.on('child_changed', callbackChanged);
        testsRef.on('child_removed', callbackRemoved);
        return testsRef.once('value');
    };
});
