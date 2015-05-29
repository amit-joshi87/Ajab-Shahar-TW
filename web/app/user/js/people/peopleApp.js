angular.module('people', ['ngRoute','htmlGenerator','utilities','animationModule','headerModule'])
    .config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/allPeople', {
                templateUrl: "/user/js/people/partials/allPeople.html",
                controller:"allPeopleController"

            })
            .when('/explore/:id',{
                templateUrl:"/user/js/people/partials/explore.html",
                controller:""
            })
            .when('/allPeople#:name',{
                templateUrl: "/user/js/people/partials/allPeople.html",
                controller:"allPeopleController"
            })
            .otherwise( {
                templateUrl: "/user/js/people/partials/allPeople.html",
                controller:"allPeopleController"
            });
        $locationProvider.html5Mode(true);
    }]);