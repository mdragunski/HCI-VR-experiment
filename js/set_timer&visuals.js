$(function() {
	/*AFRAME.registerComponent('set-start', {
        schema: {default: ''},
        init() {
          const start = document.querySelector('#startSelection');
          let startTime;
    	  const startTimeArray = [];

          this.el.addEventListener('click', () => {
                start.setAttribute('color', '#ff0000');
         
                
           		startTime = new Date();
          		startTimeFormatted = startTime.getHours() +':'+ startTime.getMinutes() +':'+ startTime.getSeconds(); 		
          		startTimeArray.push(startTimeFormatted);
          		console.log(" Start click Time: " + startTime.getTime());
           });
        }
	});*/
	
	var counter = 0;
	
	function pairTiming(startTime){
		this.startTime = startTime;
		this.endTime = -1;
		this.picture = undefined;
	}
	
	var selectionTries = new Map();

	$( document ).ready(function() {
		$(".picture").each(function(){
			$(this).mouseup(function(){
				$(this).attr("scale","1.2 1.2 1");
			});
			$(this).mousedown(function(){
				$(this).attr("scale","1 1 1");
			});
			$(this).mouseenter(function(){
				$(this).attr("scale","1.2 1.2 1");
			});
			$(this).mouseout(function(){
				$(this).attr("scale","1 1 1");
			});
			$(this).mouseleave(function(){
				$(this).attr("scale","1 1 1");
			});
			
			$(this).click(function(){
				var endTime = new Date();
          		var pictureId = $(this).attr("id");
				
				console.log(pictureId + " Click Time: " + endTime.getTime());
				
				var objPairTiming = selectionTries.get(counter);
				if(objPairTiming && objPairTiming.endTime == -1){
					objPairTiming.endTime = endTime.getTime();
					objPairTiming.picture = pictureId;
					
					$("#startSelection").each(function(){
						$(this).attr("color","#0000FF");
					});
					
					counter = counter + 1;
				}
				
				$('a-image', this).attr("src","/images/sunrise.jpg")
			});
		});
		
	
		$("#startSelection").each(function(){
			/*$(this).mouseleave(function(){
				startTime = new Date();
				console.log($(this).attr("id") + " Leave Time: " + startTime.getTime());
			});
			$(this).mouseout(function(){
				startTime = new Date();
				console.log($(this).attr("id") + " Leave Time: " + startTime.getTime());
			});*/
			$(this).click(function(){
				$(this).attr("color","#88E28C");
				
				var startTime = new Date();
				console.log($(this).attr("id") + " Leave Time: " + startTime.getTime());
				
				selectionTries.set(counter, new pairTiming(startTime.getTime()));
			});
		});
		
		$("#endSesion").each(function(){
			/*$(this).mouseleave(function(){
				startTime = new Date();
				console.log($(this).attr("id") + " Leave Time: " + startTime.getTime());
			});
			$(this).mouseout(function(){
				startTime = new Date();
				console.log($(this).attr("id") + " Leave Time: " + startTime.getTime());
			});*/
			$(this).click(function(){
				console.log(selectionTries);
				var selectionText = "id,startTime,endTime,seconds,picture\n";
				for (var [key, objPairTiming] of selectionTries) {
					/*selectionText.concat(String(key)).concat(",");
					selectionText.concat(String(objPairTiming.startTime)).concat(",");
					selectionText.concat(String(objPairTiming.endTime)).concat(",");
					var timeDuration =  objPairTiming.endTime - selectionTries.get(key).startTime;
					selectionText.concat(String(timeDuration)).concat(",");
					selectionText.concat(String(objPairTiming.picture));
					selectionText.concat("\n");*/
					
					selectionText = selectionText + key + ",";
					selectionText = selectionText + objPairTiming.startTime + ",";
					selectionText = selectionText + objPairTiming.endTime + ",";
					var timeDuration =  (objPairTiming.endTime - selectionTries.get(key).startTime)/1000;
					selectionText = selectionText + timeDuration + ",";
					selectionText = selectionText + objPairTiming.picture + "\n";
				}
				
				saveData(selectionText, "vrSelectionTargetTiming.csv");
			});
		});
		
		
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
	
		function saveData(data, fileName) {
			//var json = JSON.stringify(data);
			//var blob = new Blob([json], {type: "octet/stream"});
			var blob = new Blob([data], {type: "octet/stream"});
			var url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		}
	});
});