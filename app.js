var nextUrl;
var baseUrl = 'https://api.spotify.com/v1/search';
var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  // This is the song that is currently being played, triggered by clicking on the album art
  $scope.currentSong = null;
  // These are the tracks that persist between multiple queries, and appear in
  // the favorites section
  // Use Local storage to persist across sessions
  $scope.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // These are the tracks that represent the current query
  $scope.tracks = []

  // Saves the value of our favorites to localStorage
  function persistFavs() {
    localStorage.setItem('favorites', JSON.stringify($scope.favorites));
  }

  // Adds a given song to our favorites, so we can play it whenever we want
  $scope.addToFavorites = function(favTrack) {
    // Add it to our favorites
    $scope.favorites.push(favTrack);
    persistFavs();
    // But also remove it from the search section
    $scope.tracks = _.filter($scope.tracks, function(track) {
      return track !== favTrack;
    });
  }

  // Removes a given track from our favorites list
  $scope.removeFromFavorites = function(removeTrack) {
    $scope.favorites = _.filter($scope.favorites, function(track) {
      return track !== removeTrack;
    });
    persistFavs();
  }

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
      // If we want to get more results, just make a request with this url
      nextUrl = response.data.tracks.next;
      $scope.tracks = _.map(data, function(track) {
        var imgUrl = track.album.images[0].url || '';
        return {
          'title': track.name,
          'img': imgUrl || '',
          'artist': track.artists[0].name,
          'preview': track.preview_url
        }
      });
    }

    function fail() {
      // But if it fails, we print a little error message to the console.
      console.error('uh oh, our request failed! Try again?');
    }

  }

  // Plays the selected track
  $scope.play = function(track) {
    if($scope.currentSong === track) {
      $scope.audioObject.pause();
      $scope.currentSong = false;
      return;
    }
    else {
      if ($scope.audioObject.pause !== undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(track.preview);
      $scope.audioObject.play();
      $scope.currentSong = track;
    }
  }
});
