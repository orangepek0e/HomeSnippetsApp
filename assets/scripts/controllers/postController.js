'use strict';
angular.module('HomeSnippets').controller('postController', ['$scope', '$http', function($scope, $http){

    $scope.newPost = {};

    $scope.newPost.wifi = false;
    $scope.newPost.pets = false;
    $scope.newPost.parking = false;
    $scope.newPost.laundry = false;
    $scope.newPost.furnished = false;
    $scope.newPost.smoking = false;

    $scope.createPost = function(){
        $http.post('/api/post', $scope.newPost).success(function(response){
            console.log(response);
            $scope.newPost = {};

            $scope.newPost.wifi = false;
            $scope.newPost.pets = false;
            $scope.newPost.parking = false;
            $scope.newPost.laundry = false;
            $scope.newPost.furnished = false;
            $scope.newPost.smoking = false;
        }).error(function(error){
            console.log(error);
        })
    }


    $scope.toggleFilter = function(filter){
        switch(filter){
            case "wifi":
                console.log('wifi have been toggled');
                $scope.newPost.wifi = !$scope.newPost.wifi;
                console.log($scope.newPost.wifi);
                if($scope.newPost.wifi){
                    $(".tagIconWifi").addClass("tagIconActive");
                }else{
                    $(".tagIconWifi").removeClass("tagIconActive");
                }
                break;
            case "pets":
                console.log('pets have been toggled');
                $scope.newPost.pets = !$scope.newPost.pets;
                console.log($scope.newPost.pets);
                if($scope.newPost.pets){
                    $(".tagIconPets").addClass("tagIconActive");
                }else{
                    $(".tagIconPets").removeClass("tagIconActive");
                }
                break;
            case "parking":
                console.log('parking has been toggled');
                $scope.newPost.parking = !$scope.newPost.parking;
                console.log($scope.newPost.parking);
                if($scope.newPost.parking){
                    $(".tagIconPark").addClass("tagIconActive");
                }else{
                    $(".tagIconPark").removeClass("tagIconActive");
                }
                break;
            case "laundry":
                console.log("laundry has been toggled");
                $scope.newPost.laundry = !$scope.newPost.laundry;
                console.log($scope.newPost.laundry);
                if($scope.newPost.laundry){
                    $(".tagIconLaun").addClass("tagIconActive");
                }else{
                    $(".tagIconLaun").removeClass("tagIconActive");
                }
                break;
            case "furnished":
                console.log("furnished has been toggled");
                $scope.newPost.furnished = !$scope.newPost.furnished;
                console.log($scope.newPost.furnished);
                if($scope.newPost.furnished){
                    $(".tagIconFurn").addClass("tagIconActive");
                }else{
                    $(".tagIconFurn").removeClass("tagIconActive");
                }
                break;
            case "smoking":
                console.log("smoking has been toggled");
                $scope.newPost.smoking = !$scope.newPost.smoking;
                console.log($scope.newPost.smoking);
                if($scope.newPost.smoking){
                    $(".tagIconSmok").addClass("tagIconActive");
                }else{
                    $(".tagIconSmok").removeClass("tagIconActive");
                }
                break;

        }
    }

    var uploader = document.getElementById('uploader');

    var youtubePlayer = document.getElementById('youtube');

    uploader.addEventListener('youtube-processing-complete',function(evt){
        console.log(evt);
        youtubePlayer.videoId = evt.detail;
        $scope.newPost.content = evt.detail;
    })
    uploader.addEventListener('youtube-upload-progress',function(evt){
        console.log(evt.detail);
    })

}]);