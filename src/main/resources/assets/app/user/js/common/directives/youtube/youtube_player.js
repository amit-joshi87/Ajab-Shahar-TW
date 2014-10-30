var youtubeApp = angular.module('youtubeApp',[]);

youtubeApp.constant('YT_event', {
  STOP:            0,
  PLAY:            1,
  PAUSE:           2
});

//youtubeApp.controller('YouTubeCtrl', function($scope, YT_event) {
//  $scope.yt = {
//    width: '100%',
//    height: '100%',
//    videoid: "M7lc1UVf-VE",
//    autoplay:false,
//    showcontrols:false,
//    autoreplay:false,
//  };
//});

youtubeApp.directive('youtube', function($window, YT_event) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@",
      autoplay:"@",
      showcontrols:"@",
      autoreplay:'@',
      shouldStopVideo:'&',
    },

    template: '<div></div>',

    link: function(scope, element, attrs, $rootScope) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        scope.cueVideoById = false;

        $window.onYouTubeIframeAPIReady = function() {
            scope.$root.$broadcast('onYouTubeIframeAPIReady', 'onYouTubeIframeAPIReady');
        }

        scope.$on('onYouTubeIframeAPIReady', function (event, data) {
            scope.player = new YT.Player(element.children()[0], {
              playerVars: {
                autoplay: (scope.autoplay)? 1:0,
                html5: 1,
                theme: "light",
                modesbranding: 0,
                color: "white",
                iv_load_policy: 3,
                //showinfo: 0, //to hide youtube logo
                controls: (scope.showcontrols)?2:0
              },

              height: scope.height,
              width: scope.width,
              videoId: scope.videoid,
              events: {
                    'onStateChange': scope.onPlayerStateChange
                },
            });

            if(!scope.cueVideoById)
                scope.cueVideo();
        });

        // when video ends
        scope.onPlayerStateChange = function(event) {
            if(scope.autoreplay && event.data === 0) {
              event.target.playVideo();
            }
        }

        scope.$watch(function() { return scope.shouldStopVideo(); }, function(newValue, oldValue) {
            if (newValue == oldValue) {
              return;
            }

            if(newValue)
                scope.stopVideoInPlayer();
        });

        scope.$watch('height + width', function(newValue, oldValue) {
            if (newValue == oldValue) {
              return;
            }

            scope.player.setSize(scope.width, scope.height);
        });

        scope.cueVideo = function(){
            scope.cueVideoById = true;
            //scope.player.cueVideoById(scope.videoid, 0, "small");
        };

        scope.$watch('videoid', function(newValue, oldValue) {
            if (!scope.player || newValue == oldValue) {
              return;
            }

            scope.stopVideoInPlayer();
        });

        scope.stopVideoInPlayer = function(){
            scope.player.seekTo(0);
            scope.player.stopVideo();
        }

        scope.$on(YT_event.STOP, function () {
            scope.stopVideoInPlayer();
        });

        scope.$on(YT_event.PLAY, function () {
            scope.player.playVideo();
        });

        scope.$on(YT_event.PAUSE, function () {
            scope.player.pauseVideo();
        });
    }
  };
});