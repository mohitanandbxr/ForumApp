angular.module("forumApp")
    .factory('categoryService', ['$http', 'categoriesUrl', 'forumsUrl', function ($http, categoriesUrl, forumsUrl) {
        return {
            getCategories: function () {
                return $http.get(categoriesUrl);
            },
            addCategory: function (category) {
                var response = $http({
                    method: "post",
                    url: "/Category/AddCategory",
                    data: JSON.stringify(category),
                    dataType: "json"
                });
                return response;
            }
        }
    }]);