var appServices = angular.module( 'appServices', [] );

appServices.factory( 'posts', ['$http', '$q',  function($http, $q){

   var allPosts = $q.defer();
   $http.get( 'data/toc.json' ).success( function( httpResponse ){
      console.log( httpResponse );
      allPosts.resolve( httpResponse );
   });


   var findBySlug = function( slug ){
      var deferred = $q.defer();

      this.allPosts.then( function( posts ){
         var thepost = posts.filter( function( p ){
            return p.slug == slug;
         })[0];

         $http.get( thepost.contentURL ).success( function( d ){
            thepost.content = d;
            deferred.resolve( thepost );
         });

      });

      return deferred.promise;
   }

   var showPage = function(){
    throw "UNIMPLEMENTED";
   }

   return {
      allPosts: allPosts.promise,
      findBySlug: findBySlug,
      showPage: showPage
   }

}]);


var appControllers = angular.module( 'appControllers', [] );

appControllers.controller( 'HomeController',
   ['$scope', 'posts', '$location', '$sce', function( $scope, posts, $loc, $sce){



   var slug = $loc.path().replace( /\//, '' );
   console.log( slug );
   if( typeof slug === 'undefined' || slug === ''  ){
      slug = 'home';
   }


   posts.allPosts.then( function( allPosts ){
      console.log( allPosts );
      $scope.articles = allPosts;
   });


   $scope.showArticle = function( slug ){
      posts.findBySlug( slug ).then( function( article ){
        console.log( 'showing article: ' + slug );
        $scope.title =  article.title;
        $scope.content = $sce.trustAsHtml( article.content );
      } );

      $loc.path(  '/' + slug );
   };


   $scope.isArticle = function( article ){
        return !article.page;
   }

   console.log( slug );
   $scope.showArticle( slug );
}]);




// build this file
var app =  angular.module(  'homesiteApp', ['appControllers', 'appServices', 'appFilters'] );
