angular.module("forumApp")
.controller("forumController", ['$scope','forumService', function ($scope, forumService) {
    
    forumService.getForums()
    .then(function (data) {
        $scope.forums = data.data;
        $scope.filteredForums = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 2;
        $scope.maxSize = 2;

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredForums = $scope.forums.slice(begin, end);
        });
    });

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
    };

    $scope.editForum = function (forum) {
        $scope.divForumEdit = true;
        $scope.forumId = forum.ForumId;
        $scope.forumTitle = forum.Title;
        $scope.forumContents = forum.Contents;
        $scope.forumCreatedBy = forum.CreatedBy;
        $scope.Action = "Edit";
    };

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
            forumService.getForums()
            .then(function (data) {
                $scope.forums = data.data;
            })
        })
    };


    $scope.cancel = function () {
        $scope.forumId = "";
        $scope.forumTitle = "";
        $scope.forumContents = "";
        $scope.forumCreatedBy = "";
        $scope.divForumEdit = false;
    }
}])