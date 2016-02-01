'use strict';
angular.module('HomeSnippets').controller('dashController', function($scope, $http){
    $scope.posts = [];

    $scope.loadPosts = function(){
      $http.get("/api/post").then(function(result){
          console.log("load finished");
          $scope.posts = result.data;
          console.log(result.data);
      })

    };
});