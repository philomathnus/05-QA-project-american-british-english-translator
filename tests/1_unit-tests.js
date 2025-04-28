const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    suite('American -> British', () => {
        test('Translate Mangoes are my favorite fruit. to British English', () => {
            const americanSpelling = 'Mangoes are my favorite fruit.';
            const expectedResult = 'Mangoes are my favourite fruit.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
         test('Translate I ate yogurt for breakfast. to British English', () => {
            const americanSpelling = 'I ate yogurt for breakfast.';
            const expectedResult = 'I ate yoghurt for breakfast.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate We had a party at my friend\'s condo. to British English', () => {
            const americanSpelling = 'We had a party at my friend\'s condo.';
            const expectedResult = 'We had a party at my friend\'s flat.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate Can you toss this in the trashcan for me? to British English', () => {
            const americanSpelling = 'Can you toss this in the trashcan for me?';
            const expectedResult = 'Can you toss this in the bin for me?';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
       test('Translate The parking lot was full. to British English', () => {
            const americanSpelling = 'The parking lot was full.';
            const expectedResult = 'The car park was full.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
            const americanSpelling = 'Like a high tech Rube Goldberg machine.';
            const expectedResult = 'Like a high tech Heath Robinson device.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate To play hooky means to skip class or work. to British English', () => {
            const americanSpelling = 'To play hooky means to skip class or work.';
            const expectedResult = 'To bunk off means to skip class or work.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate No Mr. Bond, I expect you to die. to British English', () => {
            const americanSpelling = 'No Mr. Bond, I expect you to die.';
            const expectedResult = 'No Mr Bond, I expect you to die.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate Dr. Grosh will see you now. to British English', () => {
            const americanSpelling = 'Dr. Grosh will see you now.';
            const expectedResult = 'Dr Grosh will see you now.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
        test('Translate Lunch is at 12:15 today. to British English', () => {
            const americanSpelling = 'Lunch is at 12:15 today.';
            const expectedResult = 'Lunch is at 12.15 today.';
            assert.equal(translator.translate(americanSpelling, 'american-to-british'), expectedResult);
        });
    });
    suite('British -> American', () => {

    });
    suite('Highlight translation', () => {

    });
});
