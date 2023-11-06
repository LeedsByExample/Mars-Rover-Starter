const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });
  //expect that when making a new Command object, if no arguments are passed in to the Command object, to throw this error
  
  test("constructor sets command type", function() {
    let value = "test value";
    let commandType = "test type";
    let command = new Command(commandType,value);
    expect(command.commandType).toBe(commandType)
  });
  //sets two arbitrary arguments, check to see that the command type argument is passed in as the command type parameter

  //checks that the constructor correctly sets the value property in the new object
  test("constructor sets a value passed in as the 2nd argument", function() {
    let value = "test value";
    let commandType = "test type";
    let command = new Command(commandType,value);
    expect(command.value).toBe(value)
  });

});