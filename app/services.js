#ifndef APP_SERVICES
#define APP_SERVICES

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



#endif
