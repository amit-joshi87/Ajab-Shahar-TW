htmlGenerator.factory('introductionPopupService', function () {
  var getPopupDetails = function (details,contentType) {
      return _.reduce(details, function(memo, value, index){
          if(contentType=='Songs' || value.contentType=='Songs'){
              return memo+
                  '<pop-up id="oid'+index+'" width="100" show="shouldShow(\'oid'+index+'\')"'+
                  ' on-close="onClose(\'oid'+index+'\')" closeButton="true">'+
                      '<song-introduction singer="'+details[index].singer+'" name="'+details[index].name+'" url="'+details[index].youtubeVideoId+'" close-video="isClosed(\'oid'+index+'\')"></song-introduction>'+
                  '</pop-up>';
          }
          return memo;
      },'');
  };

  return {
    getPopupDetails: getPopupDetails,
  };
});