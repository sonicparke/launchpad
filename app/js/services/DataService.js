(function(){
    app.factory('DataService', DataService);

    function DataService($q, AppSecurity){

        var service = {
            Login: Login,
            GetMenuItems: GetMenuItems

        };

        return service;

        function Login(data) {
            var deferred = $q.defer();
            var params = data;
            var results = AppSecurity.all('login').post(params).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        };

        function GetMenuItems(data) {
            var deferred = $q.defer();
            var params = { UserName: data };
            var results = AppSecurity.all('menuitems').getList(params).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        };



    };


})();