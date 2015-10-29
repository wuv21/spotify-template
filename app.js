var data;
var baseUrl = 'https://api.spotify.com/v1/search'
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}

  $scope.getSongs = function() {
    // This makes a request to the spotify API, and then searches for the
    // input track
    $http.get(baseUrl, {
      params: {
        'q': $scope.track,
        'type': 'track'
      }
    }).then(succ, fail);

    function succ(response) {
      // THEN if everything is successful, we add the results to our view
      console.log('successful response!');
      console.log(response);
      data = $scope.tracks = response.data.tracks.items;
    }
    function fail() {
      // But if it fails, we print a little error message to the console.
      console.error('uh oh, our request failed! Try again?');
    }
  }

  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
});