var app = angular.module('healthApp', []);

 sensorApp.controller('MainCtrl', function( $scope, $http, $location) {

    $scope.index=function(){  
          console.log("inside mainpage ctrl --home controller");
          window.location.assign("/home");
    };

    $scope.login=function(){    
     console.log("inside mainpage ctrl --login controller");
     window.location.assign("/login");
    }; 


}
