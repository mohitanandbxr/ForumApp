angular.module("forumApp")
.directive('authorDetail', function () {
    return {
        template: "<b><span class='pull-right label label-primary'>Created By: {{item.CreatedBy}} </span>",
        restrict: "E"
    }
});