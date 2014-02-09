


var appControllers = angular.module( 'appControllers', [] );
var appServices = angular.module( 'appServices', [] );
appServices.factory( 'posts', ['$http', '$q', function($http, $q){



   var allPosts = $q.defer();

   $http.get( 'data/toc.json' ).success( function( httpResponse ){
      console.log( httpResponse );
      allPosts.resolve( httpResponse );
   });


   var findBySlug = function( slug ){
      var deferred = $q.defer();

      this.allPosts.then( function( posts ){
         var thepost = posts.filter( function( p ){
            return p.slug == slug
         });

         deferred.resolve( thepost );
      });

      return deferred.promise;

   }

   return {
      allPosts: allPosts.promise,
      findBySlug: findBySlug
   }

}]);
appControllers.controller( 'HomeController',
   ['$scope', 'posts', '$location', function( $scope, posts, $loc){
   var slug = $loc.path().replace( /\//, '' );
   if( typeof slug == 'undefined' ){
      slug = 'home';
   }
   posts.allPosts.then( function( allPosts ){
      console.log( allPosts );
      $scope.articles = allPosts;
   });
   $scope.showArticle = function( slug ){
      posts.findBySlug( slug ).then( function( article ){
         console.log( article );
      } );
      console.log( 'showing article: ' + slug );
      $scope.title = $scope.title = "Title";
      $scope.content = slug + "   " + slug;
      $loc.path( '/' + slug );
   };
   $scope.showArticle( slug );
}]);
// build this file
var app = angular.module( 'homesiteApp', ['ui.router', 'appControllers', 'appServices'] );
// the routing portion
// app.config( ['$stateProvider', '$urlRouterProvider', 
//    function( $stateProvider, $urlRouterProvider){
//       
//       $urlRouterProvider.otherwise( '/home' ); 
//       
//       $stateProvider
//          .state( 'main', {
//             url: '/:slug',
//             views: {
//                content: {
//                   templateUrl: 'partials/index.html',
//                   controller: 'HomeController'
//                }
//             }
//              
//          });
// 
// }]);
