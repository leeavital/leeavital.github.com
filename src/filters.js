var appFilters = angular.module( 'appFilters', [] );


appFilters.filter( 'articlesOnly', function(){
    return function( article ){
        return article
    }

});
