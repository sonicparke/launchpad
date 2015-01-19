//////// Get Data //////////

// Restangular services
app.service('AppSecurity', function(Restangular, ServerAPI) {

      var BaseUrl = 'http://' + ServerAPI.GetServer().Name + '/appsecuritywebapi' + ServerAPI.GetAPI().Name + '/api';

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(BaseUrl);
      });

});