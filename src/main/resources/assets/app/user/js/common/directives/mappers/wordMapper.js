'use strict';

thumbnailModule.directive("wordMapper", function() {
    return {
        replace : true,
        restrict: 'E',
        scope: {
            details:'=',
            customStyle:'@',
            showDetailsService:'='
        },
        templateUrl:'/user/js/common/templates/mappers/wordMapper.html',
        controller:function($scope){
            $scope.word = {"id":"word_"+$scope.details.id, "customStyle":$scope.customStyle,"imgSrc":$scope.details.thumbnail_url,"englishTransliteration":$scope.details.wordOrPhrase,
                            "categoryName":$scope.details.category.name, "introductionSummary":$scope.details.introductionSummary
                        };
            $scope.open = function(){
                return $scope.showDetailsService.open($scope.word.id);
            }
        }
    }
});