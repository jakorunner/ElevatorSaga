// WORKS IN: 1,2,3,4,5,6,7,8,9,16.
// NOT WORK IN 10,11.

{
    init: function(elevators, floors) {
        var pisos = floors.length - 1;
        const queryString = window.location.hash;
        const nivel = queryString.substring(queryString.indexOf('=')+1);
        console.log("Nivel: " + nivel);

        log = function() { return console.log.apply(console, arguments); };  // log("molas tu"); 
        randomPiso = function(currentPiso){ 
            var res = Math.floor(Math.random() * pisos) + 1;
            if (res == currentPiso  ) {res = 0}
            if (res == pisos && (nivel == 2)){res = 0;}
            return res;                      
        }     

        for(var i=0;i<elevators.length;i++){
            let elevator = elevators[i];
            elevator.on("floor_button_pressed", function(floorNum) { 
                  elevator.goToFloor(floorNum);
            });
            elevator.on("idle", function() {
                if ((nivel == 6 || nivel == 7 ) && elevator.loadFactor() > 0.8)   {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
                if ( nivel  < 6 || nivel == 16 || nivel == 10)                    {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
               //if ( nivel == 10){ elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
            });      
        }
             
        if (nivel == 8  || nivel == 9){
            var ajuste = 1;
            if (nivel == 9) {ajuste = 0;}
            floors[0].on("up_button_pressed",                   function() {  elevators[0].goToFloor(floors[0].floorNum()); }) 
            floors[floors.length-1].on("down_button_pressed",   function() {  elevators[elevators.length-1].goToFloor(floors[floors.length-1].floorNum()); }) 
            for(var j=1;j<floors.length-ajuste;j++){
                let floor = floors[j];
                var ascen = Math.floor(j/(elevators.length+1));
                console.log("elevator: " + ascen + " --> ir a planta -->" + j);
                floor.on("up_button_pressed",   function() {  elevators[ascen].goToFloor(floor.floorNum()); console.log(ascen + "-" +floor.floorNum()); })   // no se ejecuta bien
                floor.on("down_button_pressed", function() {  elevators[ascen].goToFloor(floor.floorNum()); console.log(ascen + "-" +floor.floorNum()); })   // no se ejecuta bien
            } 
            
        }
  
        
    },    
        update: function(dt, elevators, floors) {}
}

/*****************************************************************************************************************************************/
