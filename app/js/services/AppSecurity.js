//////// Get Data //////////

// Restangular services
app.service('AppSecurity', function(Restangular) {

      var BaseUrl = 'http://myapi';

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(BaseUrl);
      });

});