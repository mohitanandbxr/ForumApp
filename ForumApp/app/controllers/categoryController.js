angular.module("forumApp")
    .constant('categoriesUrl', 'http://localhost:50527/Category/GetCategories')
    .constant('forumsUrl', 'http://localhost:50527/Forum/GetForums')

    .controller('categoryController', ['$scope', 'categoryService', function ($scope, categoryService) {

        $scope.Hello = "Hello World!!";

        categoryService.getCategories()
                .then(function (data) {
                    $scope.categories = data.data;
                })
                .catch(function (error) {
                    $scope.error = error;
                });

        categoryService.getForums()
                .then(function (data) {
                    $scope.forums = data.data;
                })
                .catch(function (error) {
                    $scope.error = error;
                });

        $scope.getCategoryForum = function (Id) {
            categoryService.getForumsById(Id)
            .then(function (data) {
                $scope.forums = data.data;
            })
            .catch(function (error) {
                $scope.error = error;
            })
        }

        $scope.deleteForum = function (Id) {
            categoryService.deleteForum(Id)
            .then(function (data) {
                categoryService.getForums()
                .then(function (data) {
                    $scope.forums = data.data;
                })
                .catch(function (error) {
                    $scope.error = error;
                });
            })
        }

        $scope.editForum = function(forum){
            categoryService.getForum(forum.ForumId)
            .then(function(data){
                $scope.forumId = data.data.ForumId;
                $scope.forumTitle = data.data.Title;
                $scope.forumContents = data.data.Contents;
                $scope.forumCreatedBy = data.data.CreatedBy;
                $scope.divForum = true;
            }
        )
        }
    }]);