// OK: 1 - 12,16,17
//ERROR: 13,14,18
// SOMETIMES 15
{
    init: function(elevators, floors) {
        var pisos = floors.length - 1;
        const weight = 0.3;


        const queryString = window.location.hash;
        const nivel = queryString.substring(queryString.indexOf('=')+1);
        console.log("Nivel: " + nivel);
        randomPiso = function(currentPiso){ 
            var res = Math.floor(Math.random() * pisos) + 1;
            if (res == currentPiso  ) {res = 0}
            if (res == pisos && (nivel == 2)){res = 0;}
            if (nivel == 12){res = 0;}
            return res;                      
        }     

        for(var i=0;i<elevators.length;i++){
            let elevator = elevators[i];

            elevator.on("floor_button_pressed", function(floorNum) {elevator.goToFloor(floorNum);} );

            elevator.on("idle", function() {
               
                if ((nivel == 6 || nivel == 7) && elevator.loadFactor() > 0.8)    {elevator.goToFloor(randomPiso(elevator.currentFloor()));  } // if elevator full, then move (doesnt matter where)
                else if (nivel == 6 || nivel == 7){ /* if elevator not full, not move, to optimize movements instead of velocity */}
                else {
                    // see if any floors have buttons pressed and see if there are some "idle" elevators
                    let demand = floors.filter((floor) => (floor.buttonStates.up || floor.buttonStates.down));
                    let offer = elevators.filter((elevator) => elevator.destinationQueue.length == 0);
                    console.log(demand);
                    console.log(offer);
                    console.log("offer: " + offer.length + "   demand:" + demand.length);

                    if (demand.length>1){
                        // TODO: the nearest elevator go to the nearest floor instead of random-secuencial assignation.
                        if (offer.length <= demand.length){
                            for(var z=0;z<offer.length;z++){ offer[z].goToFloor(demand[z].floorNum()); console.log("o-elevator (en:"+ offer[z].currentFloor() +") free to: " + demand[z].floorNum());}
                        } else {
                            for(var z=0;z<demand.length;z++){ offer[z].goToFloor(demand[z].floorNum()); console.log("d-elevator (en:"+ offer[z].currentFloor() +") free to: " + demand[z].floorNum());}
                        }
                     }
                     else {
                       if (demand.length) { target = demand[0].floorNum();}    // choose the first one
                           else           {  target = 0; }
                         elevator.goToFloor(target);            console.log("s-elevator (en:"+ elevator.currentFloor() +") free to: " + target);
                    }
                }

            });    

            elevator.on("passing_floor", function (floorNum, direction) {
                let floor = floors[floorNum];
                let pressed = elevator.getPressedFloors();
                let stop = floor.buttonStates[direction] && elevator.loadFactor() < weight;  // true if there is someone waiting in the same direction and there are space in the elevator
                // if we're going in the same direction as the button, we can stop
                if (stop || (pressed.indexOf( floorNum) >= 0)) {
                    // remove this floor from destinations
                    elevator.destinationQueue = elevator.destinationQueue.filter( (d) => (d !== floorNum));
                    // no need to checkDestinationQueue as done in here...
                    elevator.goToFloor(floorNum, true);
                }

            });
        }  
    },    
        update: function(dt, elevators, floors) {}
}
