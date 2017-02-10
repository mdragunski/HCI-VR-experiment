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
		
	$( document ).ready(function() {
		var counter = 0;
		var selectionTries = new Map();
		
		var scaleSmall = 0.5;
		var scaleMedium = 2;
		var scaleBig = 3;
		
		var scaleIndex = 0;
		var sorted = false;
		
		var scales = [scaleSmall, scaleMedium, scaleBig];
		
		//var stackSmallPictures = 
		var maxAmountPictures = 5;
		var maxAmountScale = 3;
		var countPicturesSelected = 1; //default picture counted
		var countPicturesSelectedMap = new Map();
		countPicturesSelectedMap.set(scaleSmall, ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"]); //small pictures
		countPicturesSelectedMap.set(scaleMedium, ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"]); //medium pictures
		countPicturesSelectedMap.set(scaleBig, ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"]); //big pictures
		
		var items = countPicturesSelectedMap.get(scales[scaleIndex]);//var items = ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"];
		
		
		var random = Math.floor(Math.random()*items.length);
		var defaultPictureID = items[random];
		items.splice(random, 1);
		
		var scaleSelected = getScale();
	
		function pairTiming(startTime, pictureScale){
			this.startTime = startTime;
			this.endTime = -1;
			this.picture = undefined;
			this.pictureScale = pictureScale;
		}
		
		

		function getScale(){
			var scale = -1;
			scale = scales[scaleIndex];
			return scale + " " + scale + " " + scale;
		}
		
		function getAugmentedScale(){
			var scale = -1;
			scale = scales[scaleIndex];
			augmentedScale = scale + 0.2;
			return augmentedScale + " " + augmentedScale + " " + scale;
		}
		
		$(".picture").each(function(){
			
			updatePictureVisibility($(this), defaultPictureID);
			
			$(this).click(function(){
				var endTime = new Date();
          		var pictureId = $(this).attr("id");
				var pictureScale = $(this).attr("scale").z;
				
				console.log(pictureId + " (" + pictureScale +") Click Time: " + endTime.getTime());
				
				var objPairTiming = selectionTries.get(counter);
				if(objPairTiming && objPairTiming.endTime == -1){
					$('a-image', this).attr("src","/images/sunrise.jpg");
					
					objPairTiming.endTime = endTime.getTime();
					objPairTiming.picture = pictureId;
					objPairTiming.pictureScale = pictureScale;
					
					$("#startSelection").each(function(){
						$(this).attr("color","#FF5733");
					});
					
					counter = counter + 1;
				}				
			});
		});
		
		function updatePictureVisibility(picture, selectedPicture){
			var scale = getScale();
			var augmentedScale = getAugmentedScale();
			
			if(picture.attr("id") == selectedPicture){
				picture.attr("visible", "true");
			}else{
				picture.attr("visible", "false");
			}
			
			picture.attr("scale", scale);
			
			picture.mouseup(function(){
				picture.attr("scale", augmentedScale);
			});
			picture.mousedown(function(){
				picture.attr("scale", scale);
			});
			picture.mouseenter(function(){
				picture.attr("scale", augmentedScale);
			});
			picture.mouseout(function(){
				picture.attr("scale", scale);
			});
			picture.mouseleave(function(){
				picture.attr("scale", scale);
			});
		}
	
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
				var id = $(this).attr("id");
				
				console.log( id + " Leave Time: " + startTime.getTime());
				
				selectionTries.set(counter, new pairTiming(startTime.getTime()));
			});
			
			imageRestore();
		});
		
		/*$("#endSesion").each(function(){
			$(this).click(function(){
				console.log(selectionTries);
				var selectionText = "id,startTime,endTime,seconds,picture\n";
				for (var [key, objPairTiming] of selectionTries) {
					selectionText = selectionText + key + ",";
					selectionText = selectionText + objPairTiming.startTime + ",";
					selectionText = selectionText + objPairTiming.endTime + ",";
					var timeDuration =  (objPairTiming.endTime - selectionTries.get(key).startTime)/1000;
					selectionText = selectionText + timeDuration + ",";
					selectionText = selectionText + objPairTiming.picture + "\n";
				}
				
				saveData(selectionText, "vrSelectionTargetTiming.csv");
			});
		});*/
		
		$(document).keydown(function(e) {
			if (e.keyCode == 68 /*D*/ ) {
				var selectionText = "id,pictureScale,startTime,endTime,seconds,picture\n";
				for (var [key, objPairTiming] of selectionTries) { //save data
					selectionText = selectionText + key + ",";
					selectionText = selectionText + objPairTiming.pictureScale + ",";
					selectionText = selectionText + objPairTiming.startTime + ",";
					selectionText = selectionText + objPairTiming.endTime + ",";
					var timeDuration =  (objPairTiming.endTime - selectionTries.get(key).startTime)/1000;
					selectionText = selectionText + timeDuration + ",";
					selectionText = selectionText + objPairTiming.picture + "\n";
				}
				
				saveData(selectionText, "vrSelectionTargetTiming.csv");
			}else if (e.keyCode == 96 /*0*/ ) { //Initialize
				initializePicturesValues();
				
				if(!sorted){
					scaleIndex = Math.floor(Math.random()*scales.length);
				}
				
				items = countPicturesSelectedMap.get(scales[scaleIndex]);
				
				if(items){
					var random = Math.floor(Math.random()*items.length);
					var selectPictureID = items[random];
					items.splice(random, 1);
					
					$(".picture").each(function(){
						updatePictureVisibility($(this), selectPictureID);
					});
				}
			}else if (e.keyCode == 39 /*arrow left*/ ) { //next picture
				imageRestore();
				
				if(sorted){
					countPicturesSelected = countPicturesSelected + 1;
					if(countPicturesSelected > maxAmountPictures){
						var tempScaleIndex = scaleIndex;
						initializePicturesValues();
						scaleIndex = tempScaleIndex + 1;
					}
				}else{
					scaleIndex = Math.floor(Math.random()*scales.length);
				}
				
				items = countPicturesSelectedMap.get(scales[scaleIndex]);
				
				if(items){
					var random = Math.floor(Math.random()*items.length);
					var selectPictureID = items[random];
					items.splice(random, 1);
					
					$(".picture").each(function(){
						updatePictureVisibility($(this), selectPictureID);
					});
					
					if(items.length == 0){
						countPicturesSelectedMap.delete(scales[scaleIndex])
						scales.splice(scaleIndex, 1);
					}
				}else{
					console.log("No items");
				}
			}else if (e.keyCode == 97 /*X*/ ) {
				sorted = true;
			}else if (e.keyCode == 98 /*Y*/ ) {
				sorted = false;
			}
		});
		
		function imageRestore(){
			$(".picture").each(function(){
				$('a-image', this).attr("src","/images/imagetest.jpg");
			});
		}
		
		function initializePicturesValues(){
			imageRestore();
			
			counter = 0;
			selectionTries = new Map();
			
			maxAmountPictures = 5;
			maxAmountScale = 3;
			countPicturesSelected = 1; //default picture counted
			countPicturesSelectedMap = new Map();
			countPicturesSelectedMap.set(scaleSmall, ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"]); //small pictures
			countPicturesSelectedMap.set(scaleMedium, ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"]); //medium pictures
			countPicturesSelectedMap.set(scaleBig, ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"]); //big pictures
		
			items = countPicturesSelectedMap.get(scales[scaleIndex]);//var items = ["leftCornerUp","leftCornerDown","centered","rightCornerUp","rightCornerBottom"];
			scales = [scaleSmall, scaleMedium, scaleBig];
			
			//random = Math.floor(Math.random()*items.length);
			//defaultPictureID = items[random];
			//items.splice(random, 1);
			
			scaleIndex = 0;
			scaleSelected = getScale();
		}
		
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