angular.module('people', ['ngRoute','htmlGenerator','utilities','animationModule','headerModule','wu.masonry','thumbnailModule'])
    .config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/all', {
                templateUrl: "/user/js/people/partials/allPeople.html",
                controller:"allPeopleController"

            })
            .when('/explore/:id',{
                templateUrl:"/user/js/people/partials/explore.html",
                controller:"peopleExploreController"
            })
            .when('/all#:id',{
                templateUrl: "/user/js/people/partials/allPeople.html",
                controller:"allPeopleController"
            })
            .otherwise( {
                templateUrl: "/user/js/people/partials/allPeople.html",
                controller:"allPeopleController"
            });
        $locationProvider.html5Mode(true);
    }]);
