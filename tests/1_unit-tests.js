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
        test('Translate We watched the footie match for a while. to American English', () => {
            const americanSpelling = 'We watched the footie match for a while.';
            const expectedResult = 'We watched the soccer match for a while.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate Paracetamol takes up to an hour to work. to American English', () => {
            const americanSpelling = 'Paracetamol takes up to an hour to work.';
            const expectedResult = 'Tylenol takes up to an hour to work.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate First, caramelise the onions. to American English', () => {
            const americanSpelling = 'First, caramelise the onions.';
            const expectedResult = 'First, caramelize the onions.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate I spent the bank holiday at the funfair. to American English', () => {
            const americanSpelling = 'I spent the bank holiday at the funfair.';
            const expectedResult = 'I spent the public holiday at the carnival.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate I had a bicky then went to the chippy. to American English', () => {
            const americanSpelling = 'I had a bicky then went to the chippy.';
            const expectedResult = 'I had a cookie then went to the fish-and-chip shop.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate I\'ve just got bits and bobs in my bum bag. to American English', () => {
            const americanSpelling = 'I\'ve just got bits and bobs in my bum bag.';
            const expectedResult = 'I\'ve just got odds and ends in my fanny pack.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate The car boot sale at Boxted Airfield was called off. to American English', () => {
            const americanSpelling = 'The car boot sale at Boxted Airfield was called off.';
            const expectedResult = 'The swap meet at Boxted Airfield was called off.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate Have you met Mrs Kalyani? to American English', () => {
            const americanSpelling = 'Have you met Mrs Kalyani?';
            const expectedResult = 'Have you met Mrs. Kalyani?';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('Translate Prof Joyner of King\'s College, London. to American English', () => {
            const americanSpelling = 'Prof Joyner of King\'s College, London.';
            const expectedResult = 'Prof. Joyner of King\'s College, London.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
        test('TranslTranslate Tea time is usually around 4 or 4.30. to American English', () => {
            const americanSpelling = 'Tea time is usually around 4 or 4.30.';
            const expectedResult = 'Tea time is usually around 4 or 4:30.';
            assert.equal(translator.translate(americanSpelling, 'british-to-american'), expectedResult);
        });
    });

    suite('Highlight translation', () => {

    });
});
