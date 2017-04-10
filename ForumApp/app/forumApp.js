
angular.module("forumApp", ["ngRoute"])
               .config(function ($routeProvider, $locationProvider) {
                 
                   $routeProvider.when("/categories", {
                       templateUrl: "app/partial/categories.html",
                       controller: "categoryController"
                   });

                   $locationProvider.html5Mode(true);
               })