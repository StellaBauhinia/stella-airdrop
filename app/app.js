var app = angular.module("simpleWallet", ['ngRoute']);

app.controller("AirDropController", AirDropController);
app.controller("EventsController", EventsController);
app.controller("MainController", MainController);
app.controller("TokenController", TokenController);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .when('/airdrop',{
      templateUrl: 'views/airdrop.html',
      controller: 'AirDropController'
    })
    .when('/events',{
      templateUrl: 'views/events.html',
      controller: 'EventsController'
    })
    .when('/token',{
      templateUrl: 'views/token.html',
      controller: 'TokenController'
    })
    .otherwise({
      templateUrl: 'views/four-oh-four.html'
    });
});
