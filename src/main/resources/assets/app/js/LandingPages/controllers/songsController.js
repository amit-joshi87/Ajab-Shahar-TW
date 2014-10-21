var songsController = function($scope,contentService,thumbnailService,introductionPopupService){
    $scope.popupContent=null;
    $scope.thumbnailContent=null;
    $scope.shouldBeOpen={};
    $scope.init = function(){
        contentService.getSongsLandingPageThumbnails().then(function(result){
            $scope.thumbnailContent = thumbnailService.getThumbnailWithBubble(result.data,'Songs');
            $scope.popupContent = introductionPopupService.getPopupDetails(result.data,'Songs');
        });
    }

    $scope.open = function(id){
        $scope.shouldBeOpen[id] = true;
    }

    $scope.onClose = function(id){
        $scope.shouldBeOpen[id] = false;
    }

    $scope.shouldShow = function(id){
        return $scope.shouldBeOpen[id];
    }

    $scope.isClosed = function(id){
        return !$scope.shouldBeOpen[id];
    }

    $scope.init();
}

mainLandingPageApp.controller('songsController',['$scope','contentService','thumbnailService','introductionPopupService',songsController]);