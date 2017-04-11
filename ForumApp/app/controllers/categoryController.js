angular.module("forumApp")
    .constant('categoriesUrl', 'http://localhost:50527/Category/GetCategories')
    .constant('forumsUrl', 'http://localhost:50527/Forum/GetForums')

    .controller('categoryController', ['$scope','categoryService','forumService', function ($scope,categoryService, forumService) {

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

        //forumService.getForums()
        //        .then(function (data) {
        //            $scope.forums = data.data;
        //        })
        //        .catch(function (error) {
        //            $scope.error = error;
        //        });

        $scope.getCategoryForum = function (Id) {
            $scope.divForumEdit = false;
            $scope.divCategoryAdd = false;
            forumService.getForums(Id)
            .then(function (data) {
                $scope.forums = data.data;
            })
            .catch(function (error) {
                $scope.error = error;
            })
        }

        $scope.deleteForum = function (Id) {
            forumService.deleteForum(Id)
            .then(function (data) {
                forumService.getForums()
                .then(function (data) {
                    $scope.forums = data.data;
                })
                .catch(function (error) {
                    $scope.error = error;
                });
            })
        }

        $scope.editForum = function (forum) {
            $scope.divCategoryAdd = false;
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
            forumService.updateForum(Forum)
            .then(function () {
                if (selectedCategory != null) {
                    forumService.getForums(selectedCategory)
                    .then(function (data) {
                        $scope.forums = data.data;
                    })
                }
                else {
                    forumService.getForums()
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
            $scope.divCategoryAdd = false;
        }

        $scope.addCategory = function () {
            $scope.divCategoryAdd = true;
        }

        $scope.addCategoryData = function () {
            var Category = {
                CategoryName : $scope.categoryName
            }
            $scope.divCategoryAdd = false;
            categoryService.addCategory(Category)
            .then(function () {
                categoryService.getCategories()
                .then(function(data){
                    $scope.categories = data.data;
                })
            })
        }
    }]);