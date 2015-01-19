app.controller('Login', function (DataService){
    var vm = this;
    
    vm.Login = Login;

    // Initial Functions
    //$scope.InitPage = function() {
    //    console.log('login works');
    //};

    function Login() {
        console.log('vm.login :', vm.login);
        return DataService.Login(vm.login).then(function(res){
            vm.currentUser = res;
            console.log('vm.currentUser', vm.currentUser);
        });
    };


});