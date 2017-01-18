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
				if(objPairTiming){
					objPairTiming.endTime = endTime.getTime();
					objPairTiming.picture = pictureId;
					counter = counter + 1;
				}
				
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
				var startTime = new Date();
				console.log($(this).attr("id") + " Leave Time: " + startTime.getTime());
				
				selectionTries.set(counter, new pairTiming(startTime.getTime()));
			});
		});
		
		$("#testObject").each(function(){
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
			});
		});
	});
});