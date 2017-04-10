
angular.module("forumApp", ["ngRoute",'ui.bootstrap'])
               .config(function ($routeProvider, $locationProvider) {
                 
                   $routeProvider.when("/categories", {
                       templateUrl: "app/partial/categories.html",
                       controller: "categoryController"
                   });

                   $routeProvider.when("/forums", {
                       templateUrl: "app/partial/forums.html",
                       controller: "forumController"
                   });

                   $locationProvider.html5Mode(true);
               })