const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    test("throws error if name is NOT passed into constructor as the first parameter", function() {
        expect(function() {new Message();}).toThrow(new Error("Name required."));
    });

    test("constructer sets name", function() {
        let message = new Message("please no more");
        expect(message.name).toBe("please no more");
    });
});

// it("throws error if command type is NOT passed into constructor as the first parameter", function() {
//     expect( function() { new Command();}).toThrow(new Error('Command type required.'));
//   });