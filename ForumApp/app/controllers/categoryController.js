angular.module("forumApp")
    .constant('categoriesUrl', 'http://localhost:50527/Category/GetCategories')
    .constant('forumsUrl', 'http://localhost:50527/Forum/GetForums')

    .controller('categoryController', ['$scope','categoryService', function ($scope,categoryService) {

        var selectedCategory = null;
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
        }
        

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
            $scope.divForumEdit = false;
            categoryService.getForums(Id)
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

        $scope.editForum = function (forum) {
            $scope.divForumEdit = true;
            $scope.forumId = forum.ForumId;
            $scope.forumTitle = forum.Title;
            $scope.forumContents = forum.Contents;
            $scope.forumCreatedBy = forum.CreatedBy;
        }

        $scope.editForumData = function () {
            var Forum = {
                ForumId: $scope.forumId,
                Title: $scope.forumTitle,
                Contents: $scope.forumContents,
                CreatedBy: $scope.forumCreatedBy
            };
            $scope.divForumEdit = false;
            categoryService.updateForum(Forum)
            .then(function () {
                if (selectedCategory != null) {
                    categoryService.getForums(selectedCategory)
                    .then(function (data) {
                        $scope.forums = data.data;
                    })
                }
            })
        }
                

        $scope.cancel = function () {
            $scope.forumId = "";
            $scope.forumTitle = "";
            $scope.forumContents = "";
            $scope.forumCreatedBy = "";
            $scope.divForumEdit = false;
        }
    }]);