// Loads up the html fragrment into memory
var html = require('html!./app.html');
// Automatically injects our own css
require('style!css!./main.css');

// Actually inserts the HTML into the DOM
document.write(html);
// We do this, that way we reload automatically on any HTML change

var angular = require('angular');

var data;
var nextUrl;
var baseUrl = 'https://api.spotify.com/v1/search';
var myApp = angular.module('myApp', []);

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
      data = response.data.tracks.items;
      // If we want to get more results, just make a request with this url
      nextUrl = response.data.tracks.next;
      $scope.tracks = _.map(data, function(track) {
        var imgUrl = track.album.images[0].url;
        return {
          'title': track.name,
          'url': imgUrl,
          'artist': track.artists[0].name
        }
      });
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
