var peopleApp = angular.module('people', ['ngRoute','htmlGenerator','utilities','animationModule','headerModule'])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider

            .when('/allPeople', {
                templateUrl: "/user/js/people/partials/allPeople.html"

            })
            .otherwise( {
                templateUrl: "/user/js/reflections/partials/allReflections.html"

            })
    }]);