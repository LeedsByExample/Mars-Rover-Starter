const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  //7. constructor sets position and default values for mode and generatorWatts
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let roverOne = new Rover(7);
    expect(roverOne.mode).toBe("NORMAL");
    expect(roverOne.generatorWatts).toBe(110);
  });

  //8. response returned by receiveMessage contains the name of the message
  test("response returned by receiveMessage contains the name of the message", function() {
    let command = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("New message!", command);
    let roverOne = new Rover(7);
    expect(roverOne.receiveMessage(message).message).toBe("New message!");
  });

  //9. response returned by receiveMessage includes two results if two commands are sent in the message
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commandOne = new Command("MODE_CHANGE", "LOW_POWER");
    let commandTwo = new Command("MODE_CHANGE", "NORMAL");
    let commands = [commandOne, commandTwo];
    let message = new Message("Here's two commands!", commands);
    let roverOne = new Rover(7);
    expect(roverOne.receiveMessage(message).results.length).toBe(commands.length);
  });

  //10. responds correctly to the status check command
  //(For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the 
  //current state of the rover object — mode, generatorWatts, and position. The test should check each of these 
  //for accuracy.)
  test("responds correctly to the status check command", function() {
    let command = new Command("STATUS_CHECK");
    let message = new Message("Check status!", [command]);
    let roverOne = new Rover(7);
    let response = roverOne.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus.mode).toBe(roverOne.mode);
    expect(response.results[0].roverStatus.generatorWatts).toBe(roverOne.generatorWatts);
    expect(response.results[0].roverStatus.position).toBe(roverOne.position);
  });

  //11. responds correctly to the mode change command
  //The test should check the completed property and rover mode for accuracy.
  //The rover has two modes that can be passed as values to a mode change command: ‘LOW_POWER’ and ‘NORMAL’.
  test("responds correctly to the mode change command", function() {
    let command = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("Mode change!", [command]);
    let roverOne = new Rover(7);
    let response = roverOne.receiveMessage(message);
    expect(roverOne.mode).toBe("LOW_POWER");
    expect(response.results[0].completed).toBe(true);
    command = new Command("MODE_CHANGE", "NORMAL");
    message = new Message("Mode change!", [command]);
    response = roverOne.receiveMessage(message);
    expect(roverOne.mode).toBe("NORMAL");
  });


  //12. responds with a false completed value when attempting to move in LOW_POWER mode
  //The test should check the completed property for accuracy and confirm that the rover’s position did not change.
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commandOne = new Command("MODE_CHANGE", "LOW_POWER");
    let commandTwo = new Command("MOVE", 100);
    let commands = [commandOne, commandTwo];
    let message = new Message("Try to move on LOW_POWER", commands);
    let roverOne = new Rover(7);
    let response = roverOne.receiveMessage(message);
    expect(response.results[1]).toEqual({completed: false});
    expect(roverOne.position).toBe(7);
  });


  //13. responds with the position for the move command
  //A MOVE command will update the rover’s position with the position value in the command.
  test("responds with the position for the move command", function() {
    let command = new Command("MOVE", 100);
    let message = new Message("Move to new position", [command]);
    let roverOne = new Rover(7);
    let response = roverOne.receiveMessage(message);
    expect(roverOne.position).toEqual(100);
  });

});
