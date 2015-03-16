animationModule.animation('.toggleBySlide', function () {
  return {
    beforeAddClass: function (element, className, done) {
      if (className == 'ng-hide') {
        element.slideUp(750);
      }
      else {
             done();
           }
      },
      beforeRemoveClass: function (element, className, done) {
        if (className == 'ng-hide') {
            element.removeClass('ng-hide');
            element.slideDown(750);
          }
          else {
                 done();
          }
        }
      };
});