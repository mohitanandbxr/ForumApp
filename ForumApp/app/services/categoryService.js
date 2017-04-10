angular.module("forumApp")
    .factory('categoryService', ['$http', 'categoriesUrl', 'forumsUrl', function ($http, categoriesUrl, forumsUrl) {
        return {
            getCategories: function () {
                return $http.get(categoriesUrl);
            },
            getForums: function () {
                return $http.get(forumsUrl);
            },
            getForum: function (Id) {
                return $http.get("http://localhost:50527/Forum/GetForum?Id=" + Id);
            },
            getForumsById: function (Id) {
                return $http.get(forumsUrl+"?Id="+Id);
            },
            deleteForum: function (Id) {
                return $http.get("http://localhost:50527/Forum/DeleteForum?Id=" + Id);
            }
        }
    }]);