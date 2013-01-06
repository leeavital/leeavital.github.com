window.onload = function(){
	var left = document.getElementById("left");	
	var right = document.getElementById("right");	
	var search = document.getElementById("searchbar");	

	window.onresize = function(){
				
		winWidth = window.innerWidth;
		if(winWidth > 400){
			left.style.width = '100px';
			right.style.width = (winWidth - 220) + 'px';		
			left.style.display = 'inline';
			search.style.display = 'inline';
		}else{	
			left.style.display = 'none';
			search.style.display = 'none';
			right.style.width = (winWidth - 40) + 'px';			
		}

	}
	
	window.doHighlights();
	window.onresize(); // initial dimensioning
}



function doHighlights(){
	
	HIGHLIGHTER.doErlang();

}




var HIGHLIGHTER = {};


HIGHLIGHTER.doErlang = function(){
	
	var erlangLine = function(s){
		console.log(s);	
		if( /%/.test(s) ){
			
			return '<div style="color: blue">' + s + '</div>';

		}
				
				
				
		return '<div>' + s + '</div>';			
			
	}
	
	var erlangSection = function(text){ 
		lines =text.split('\n');
		highlightedText = '';
		for(l in lines){
			highlightedText += erlangLine(lines[l]);
			
		}

		return highlightedText;
				
			
	}

	var erlangTags = document.getElementsByClassName("highlight-erlang");
	
	for(var i = 0; i < erlangTags.length; i++){
		
		var tag = erlangTags[i];	
		tag.innerHTML = erlangSection(tag.innerHTML);	

		
	}
		



}
