window.onload=function(){var left=document.getElementById("left");var right=document.getElementById("right");var search=document.getElementById("searchbar");window.onresize=function(){winWidth=document.body.offsetWidth;if(winWidth>400){left.style.width="100px";right.style.width=(winWidth-200)+"px";left.style.display="inline"}else{left.style.display="none";right.style.width="90%"}};window.doHighlights();window.onresize()};function doHighlights(){HIGHLIGHTER.doErlang()}var HIGHLIGHTER={};HIGHLIGHTER.doErlang=function(){var erlangLine=function(s){rexp="";rexp+="(%.*)";rexp+="|(\\))";rexp+="|(\\))";rexp+="|[a-zA-Z]*";rexp+="|(.)";rexp=new RegExp(rexp)+"g";console.log(rexp);tokens=s.match(rexp);console.log(tokens);line="";for(i in tokens){token=tokens[i];if(/%.*/.test(token)){line+='<span style="color: blue">'+token+"</span>"}else{if(/case|of|if|when/.test(token)){line+='<span style="color: yellowgreen">'+token+"</span>"}else{if(token){line+="<span>"+token+"</span>"}}}}return"<div>"+line+"</div>"};var erlangSection=function(text){lines=text.split("\n");highlightedText="";for(l in lines){highlightedText+=erlangLine(lines[l])}return highlightedText};var erlangTags=document.getElementsByClassName("highlight-erlang");for(var i=0;i<erlangTags.length;i++){var tag=erlangTags[i];tag.innerHTML=erlangSection(tag.innerHTML)}};}


					
		}




		return '<div>' + line + '</div>';
				
			
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
