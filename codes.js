// WORKS IN LEVELS: 1,2,3,4,5 and 16 (optimize time)
{
    init: function(elevators, floors) {
        
        var pisos = floors.length - 1;
        
        log = function() { return console.log.apply(console, arguments); };  // log("molas tu"); 
        randomPiso = function(currentPiso){ 
            var res = Math.floor(Math.random() * pisos) + 1;
            if (res == currentPiso  /*|| res == pisos */) {res = 0};
            return res;                      
        }     
        
        for(var i=0;i<elevators.length;i++){
            let elevator = elevators[i];
            elevator.on("floor_button_pressed", function(floorNum) { elevator.goToFloor(floorNum);} );
            elevator.on("idle", function() {elevator.goToFloor(randomPiso(elevator.currentFloor()));  });      
        } 
    },    
    update: function(dt, elevators, floors) {}
}



// WORKS IN LEVELS: 6,7 (Added a "loadFactor" to ensure the elevator is full before move, to optimize movements)
{
    init: function(elevators, floors) {
        
        var pisos = floors.length - 1;
        
        log = function() { return console.log.apply(console, arguments); };  // log("molas tu"); 
        randomPiso = function(currentPiso){ 
            var res = Math.floor(Math.random() * pisos) + 1;
            if (res == currentPiso  /*|| res == pisos */) {res = 0};
            return res;                      
        }     
        
        for(var i=0;i<elevators.length;i++){
            let elevator = elevators[i];
            elevator.on("floor_button_pressed", function(floorNum) { elevator.goToFloor(floorNum);} );
            elevator.on("idle", function() {if(elevator.loadFactor() > 0.8) {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }});      
        } 
    },    
    update: function(dt, elevators, floors) {}
}
