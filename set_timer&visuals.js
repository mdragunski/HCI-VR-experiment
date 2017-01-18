AFRAME.registerComponent('set-start', {
        schema: {default: ''},
        init() {
          const start = document.querySelector('#startSelection');
          let startTime;
    	  const startTimeArray = [];

          this.el.addEventListener('click', () => {
                start.setAttribute('color', '#ff0000');
         
                console.log('starting time');
           		startTime = new Date();
          		startTimeFormatted = startTime.getHours() +':'+ startTime.getMinutes() +':'+ startTime.getSeconds(); 		
          		startTimeArray.push(startTimeFormatted);
          		console.log(startTimeArray);
            });
        }
});

AFRAME.registerComponent('set-selection', {
        schema: {default: ''},
        init() {
          const link = document.querySelector('#link');
          let endTime;
          const endTimeArray = [];

          this.el.addEventListener('click', () => {
                links.setAttribute('scale', '1.2 1.2 1');
                
          		console.log("selection time");
          		endTime = new Date();
          		endTimeFormatted = endTime.getHours() +':'+ endTime.getMinutes() +':'+ endTime.getSeconds(); 		
          		endTimeArray.push(endTimeFormatted);
          		console.log(endTimeArray);		

            });

          this.el.addEventListener('mouseenter', () => {
          		console.log("mouseenter")
          });

          this.el.addEventListener('mouseleave', () => {
          		console.log("mouseleave")
          		links.setAttribute('scale', '1 1 1');
          });
        }
});