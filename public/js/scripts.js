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

	window.onresize(); // initial dimensioning
}

