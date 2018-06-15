
const exercise = require('../exercise1');

describe('fizzBuzz',()=>{

    it('throw error if input is not number',()=>{
        expect(()=>{exercise.fizzBuzz('rahul')}).toThrow();
        expect(()=>{exercise.fizzBuzz(null)}).toThrow();
        expect(()=>{exercise.fizzBuzz(undefined)}).toThrow();
        expect(()=>{exercise.fizzBuzz({})}).toThrow();
    });

    it('give string when mod of 3 and 5 number is passed',()=>{
        const result = exercise.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('give string when mod of 3 number is passed',()=>{
        const result = exercise.fizzBuzz(33);
        expect(result).toBe('Fizz');
    });

    it('give string when mod of 5 number is passed',()=>{
        const result = exercise.fizzBuzz(25);
        expect(result).toBe('Buzz');
    });
});