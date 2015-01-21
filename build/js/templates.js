angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html><html ng-app=LaunchPad><head><meta http-equiv=X-UA-Compatible content=\"IE=edge,chrome=1\"><meta http-equiv=content-type content=\"text/html;charset=utf-8\"><script type=text/javascript>\n        // THIS MUST BE LEFT AT THE TOP OF THE PAGE.\n        document.write(\'<base href=\"\' + document.location + \'\" />\');\n    </script><meta name=viewport content=\"width=device-width\"><link href=libs/webfont-opensans/stylesheet.css rel=stylesheet type=text/css><link href=libs/font-awesome/css/font-awesome.min.css rel=stylesheet type=text/css><link href=libs/bootstrap/dist/css/bootstrap.min.css rel=stylesheet type=text/css><link href=css/style.css rel=stylesheet type=text/css><title>AXC Launch Pad Dev</title></head><body ng-controller=MainCtrl><ng-server-select></ng-server-select><div ng-include=\"\'app/partials/login.html\'\"></div><div ui-view=\"\"></div><div ng-include=\"\'app/partials/footer.html\'\"></div><script src=libs/angular/angular.min.js></script><script src=libs/angular-ui-router/release/angular-ui-router.min.js></script><script src=libs/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js></script><script src=libs/lodash/dist/lodash.min.js></script><script src=libs/restangular/dist/restangular.min.js></script><script src=js/app.js></script><script src=js/controllers/MainCtrl.js></script><script src=js/controllers/AppListViewCtrl.js></script><script src=js/controllers/LoginViewCtrl.js></script><script src=js/directives/alert-inline.js></script><script src=js/directives/alert.js></script><script src=js/directives/loader.js></script><script src=js/directives/server-select.js></script><script src=js/services/AppSecurity.js></script><script src=js/services/DataService.js></script><script src=js/templates.js></script></body></html>");
$templateCache.put("partials/appList.html","<div ng-init=InitPage()><alert ng-repeat=\"alert in alerts\" type=alert.type close=closeAlert($index)>{{alert.msg}}</alert><section class=\"menu container\"><div ng-dog-loader=\"\" ng-show=showLoader></div><nav class=row><ul class=list-unstyled><li class=\"col-md-4 col-sm-12\" ng-repeat=\"item in MenuItems\"><a class=\"btn btn-block btn-inverse clearfix\" href={{item.Url}} target=_blank><i class=\"fa fa-{{item.Icon}} fa-3x pull-left\"></i><div class=menuText>{{item.Title}}<br><small>{{item.SubTitle}}</small></div></a></li></ul></nav></section></div>");
$templateCache.put("partials/footer.html","<footer class=\"navbar navbar-fixed-bottom\"><nav class=container><h4><i class=\"fa fa-external-link-square fa-white\"></i> Helpful Links</h4><ul class=\"links list-unstyled\"><li class=col-md-3><a href=http://helpdesk.harsco.com target=_blank>Submit a Support Ticket</a></li><li class=col-md-3><a href=http://portal.harsco.com target=_blank>Harsco Information Portal</a></li><li class=col-md-3><a href=\"http://directoryupdate.harsco.com/Main/\" target=_blank>Outlook Update Tool</a></li><li class=col-md-3><a href=http://teams.harsco.com/sites/IND/AXC/default.aspx target=_blank>AXC Intranet</a></li><li class=col-md-3><a href=http://axcuscatfiler01/Public/Phone%20List/Phone%20List.xls target=_blank>Phone List</a></li><li class=col-md-3><a href=http://portal.harsco.com/sites/axc/Lists/CreditDebitMemo/AllItems.aspx target=_blank>Credit Debit Memo</a></li></ul></nav><section class=\"col-md-1 logo\"><img src=images/logo-gray.png></section></footer>");
$templateCache.put("partials/login.html","<div ng-controller=\"Login as vm\" ng-init=InitPage() class=container><h1>Login</h1><form ng-submit=vm.Login() class=form-horizontal role=form><div class=form-group><label for=inputUsername class=\"control-label sr-only\">Username</label><div class=\"col-md-12 col-sm-12\"><input ng-model=vm.login.UserName name=name type=text class=form-control id=inputName placeholder=Name></div></div><div class=form-group><label for=inputPassword class=\"control-label sr-only\">Password</label><div class=\"col-md-12 col-sm-12\"><input ng-model=vm.login.Password name=password type=password class=form-control id=inputEmail placeholder=Password></div></div><div class=form-group><div class=col-sm-10><button type=submit id=submitButton class=\"btn btn-default\">Sign In</button></div></div></form></div>");
$templateCache.put("partials/StandardAlertTemplate.html","<div class=\"alert alert-block\" ng-class=\"\'alert-\' + type\"><style>\n		.alert {\n		    margin-left: auto;\n		    margin-right: auto;\n		}\n		.alert-pad-shift {\n		    padding: 8px 14px;\n		}\n	</style><div ng-transclude=\"\"></div></div>");}]);