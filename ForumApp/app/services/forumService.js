angular.module("forumApp")
    .factory('forumService', ['$http', function ($http) {
        return {
            getForums: function (Id) {
                return $http.get("http://localhost:50527/Forum/GetForums?Id=" + Id);
            },
            deleteForum: function (Id) {
                return $http.get("http://localhost:50527/Forum/DeleteForum?Id=" + Id);
            },
            updateForum: function (forum) {
                var response = $http({
                    method: "post",
                    url: "/Forum/EditForum",
                    data: JSON.stringify(forum),
                    dataType: "json"
                });
                return response;
            },
            addForum: function (forum) {
                var response = $http({
                    method: "post",
                    url: "/Forum/AddForum",
                    data: JSON.stringify(forum),
                    dataType: "json"
                });
                return response;
            }
        }
    }]);