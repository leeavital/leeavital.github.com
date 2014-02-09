#ifndef APP_HOME_CONTROLLER
#define APP_HOME_CONTROLLER

#include "controllers.js"
#include "services.js"

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
      $scope.title =    $scope.title = "Title";
      $scope.content = slug + "   " + slug;
      $loc.path(  '/' + slug );
   };


   $scope.showArticle( slug );
}]);


#endif
