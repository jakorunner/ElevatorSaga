// WORKS IN LEVELS: 1,2,3,4,5,6,7, 16 (optimize time or movements)
// SOMETIME WORKS ON: 8,9,10,11.
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
            elevator.on("floor_button_pressed", function(floorNum) {elevator.goToFloor(floorNum);} );
            elevator.on("idle", function() {
                if ((nivel == 6 || nivel == 7) && elevator.loadFactor() > 0.8)    {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
                if ( nivel != 6 && nivel != 7)                                    {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
            });      
        } 
    },    
        update: function(dt, elevators, floors) {}
}





// CHALLENGE 8

{
    init: function(elevators, floors) {
        var elevator0 = elevators[0]; // Let's use the first elevator
        var elevator1 = elevators[1]; // Let's use the first elevator
    
        var floor0 = floors[0];
        var floor1 = floors[1];
        var floor2 = floors[2];
        var floor3 = floors[3];
        var floor4 = floors[4];
        var floor5 = floors[5];
        var num_pisos = floors.length -1;
        
        function randomPiso(pisoActual){
            res = Math.floor(Math.random() * num_pisos) + 1;
            if (res == pisoActual){res = 0;}
            return res; 
        }

        floor0.on("up_button_pressed", function() { elevator0.goToFloor(0); })
        floor1.on("up_button_pressed", function() { elevator0.goToFloor(1); })
        floor1.on("down_button_pressed", function() { elevator0.goToFloor(1); })
        floor2.on("up_button_pressed", function() { elevator0.goToFloor(2); })       
        floor2.on("down_button_pressed", function() { elevator0.goToFloor(2); })
        
        floor3.on("up_button_pressed", function() { elevator1.goToFloor(3); })     
        floor3.on("down_button_pressed", function() { elevator1.goToFloor(3); })
        floor4.on("down_button_pressed", function() { elevator1.goToFloor(4); })
        floor4.on("up_button_pressed", function() { elevator1.goToFloor(4); })
        floor5.on("down_button_pressed", function() { elevator1.goToFloor(5); })


        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator0.on("idle", function() {   /*   elevator0.goToFloor(randomPiso( elevator0.currentFloor() ));  */ },
        elevator0.on("floor_button_pressed", function(floorNum) {  elevator0.goToFloor(floorNum);}) );
        

        elevator1.on("idle", function() {   /*      elevator1.goToFloor(randomPiso( elevator1.currentFloor() ));    */ },
        elevator1.on("floor_button_pressed", function(floorNum) {  elevator1.goToFloor(floorNum); }) );


    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}


// CHALLENGE 9

{
    init: function(elevators, floors) {
        var elevator0 = elevators[0]; // Let's use the first elevator
        var elevator1 = elevators[1]; // Let's use the first elevator
        var elevator2 = elevators[2];
        
        var floor0 = floors[0];
        var floor1 = floors[1];
        var floor2 = floors[2];
        var floor3 = floors[3];
        var floor4 = floors[4];
        var floor5 = floors[5];
        var floor6 = floors[6];
        var num_pisos = floors.length -1;
        
        floor0.on("up_button_pressed", function()   { elevator0.goToFloor(0); })
        
        floor1.on("up_button_pressed", function()   { elevator0.goToFloor(1); })
        floor1.on("down_button_pressed", function() { elevator0.goToFloor(1); })
        
        floor2.on("up_button_pressed", function()   { elevator0.goToFloor(2); })       
        floor2.on("down_button_pressed", function() { elevator1.goToFloor(2); })
        
        floor3.on("up_button_pressed", function()   { elevator1.goToFloor(3); })     
        floor3.on("down_button_pressed", function() { elevator1.goToFloor(3); })
        
        floor4.on("down_button_pressed", function() { elevator1.goToFloor(4); })
        floor4.on("up_button_pressed", function()   { elevator2.goToFloor(4); })
        
        floor5.on("up_button_pressed", function()   { elevator2.goToFloor(5); })
        floor5.on("down_button_pressed", function() { elevator2.goToFloor(5); })
        
        floor6.on("down_button_pressed", function() { elevator2.goToFloor(6); })


        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator0.on("floor_button_pressed", function(floorNum) {  elevator0.goToFloor(floorNum);})
        elevator1.on("floor_button_pressed", function(floorNum) {  elevator1.goToFloor(floorNum);})
        elevator2.on("floor_button_pressed", function(floorNum) {  elevator2.goToFloor(floorNum);})

    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}





//// INVESTIGAR POR QUE CASCA EN 8 y 9.
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
            elevator.on("floor_button_pressed", function(floorNum) { elevator.goToFloor(floorNum);} );
            elevator.on("idle", function() {
                if ((nivel == 6 || nivel == 7 ) && elevator.loadFactor() > 0.8)   {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
                if ( nivel  < 6 || nivel == 16)                                   {elevator.goToFloor(randomPiso(elevator.currentFloor()));  }
                if ( nivel == 9){}
            });      
        } 
        for(var j=0;j<floors.length;j++){
            let floor = floors[j];
            var ascen = Math.floor(j/3);
            console.log("elevator: " + ascen + " --> ir a planta -->" + j);
            floor.on("up_button_pressed", function()   {  elevators[ascen].goToFloor(j);  })
            floor.on("down_button_pressed", function() {  elevators[ascen].goToFloor(j);  })
        } 
        
        /*
        var elevator0 = elevators[0]; // Let's use the first elevator
        var elevator1 = elevators[1]; // Let's use the first elevator
        var floor0 = floors[0];
        var floor1 = floors[1];
        var floor2 = floors[2];
        var floor3 = floors[3];
        var floor4 = floors[4];
        var floor5 = floors[5];
        floor0.on("up_button_pressed", function() { elevator0.goToFloor(0); })
        floor1.on("up_button_pressed", function() { elevator0.goToFloor(1); })
        floor1.on("down_button_pressed", function() { elevator0.goToFloor(1); })
        floor2.on("up_button_pressed", function() { elevator0.goToFloor(2); })       
        floor2.on("down_button_pressed", function() { elevator0.goToFloor(2); })

        floor3.on("up_button_pressed", function() { elevator1.goToFloor(3); })     
        floor3.on("down_button_pressed", function() { elevator1.goToFloor(3); })
        floor4.on("down_button_pressed", function() { elevator1.goToFloor(4); })
        floor4.on("up_button_pressed", function() { elevator1.goToFloor(4); })
        floor5.on("down_button_pressed", function() { elevator1.goToFloor(5); })
        */
               
        
    },    
        update: function(dt, elevators, floors) {}
}

