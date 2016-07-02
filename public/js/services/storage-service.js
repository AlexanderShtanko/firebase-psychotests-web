/**
 * Created by aleksandr on 13.03.16.
 */
app.service("StorageService", function (localStorageService) {


    this.setToken = function (token) {
        localStorageService.set("token", token);
    };
    this.getToken = function () {
        return localStorageService.get("token");
    };

    this.setProfile = function (profile) {
        localStorageService.set("profile", profile);
    };
    this.getProfile = function () {
        return localStorageService.get("profile");
    };

    this.clear = function () {
        localStorageService.clearAll();
    }
});
