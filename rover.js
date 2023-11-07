class Rover {
   constructor(position) {
      this.position = position;
      if(!position) {
         throw Error("Rover position required.");
      };
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   };

   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      };

      //message.commands is my commands that i want in my results
      //for each command, add a new result object to response.results
      for (let i = 0; i < message.commands.length; i++) {
         if(message.commands[i].commandType === "MOVE") {
            if(this.mode === "LOW_POWER") {
               response.results.push({completed: false});
            } else {
               response.results.push({completed: true});
               this.position = message.commands[i].value;
            };

         } else if (message.commands[i].commandType === "MODE_CHANGE") {
            response.results.push({completed: true});
            this.mode = message.commands[i].value;
         } else if (message.commands[i].commandType === "STATUS_CHECK") {
            response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
         }  
      };

      return response;
   }
};




module.exports = Rover;
