//////// Get Data //////////

// Restangular services
app.service('GetMenuItems', function(Restangular, ServerAPI) {

    var GetServer = function() {
        Server = ServerAPI.GetServer();
        if(!Server) {
            Server = 'axcapps.harsco.com';
            return Server;
        } else {
            return Server.servername;
        }
      };

      var GetAPIEnv = function() {
        DevAPI = ServerAPI.GetAPI();
        if(DevAPI === 'Test') {
            return DevAPI;
        } else if(!DevAPI || DevAPI.name === 'Prod') {
            DevAPI = '';
            return DevAPI;
        }
        else {
            return DevAPI.name;
        }
      };

      var BaseUrl = 'http://' + GetServer() + '/appsecuritywebapi' + GetAPIEnv() + '/api';

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(BaseUrl);
      });



});