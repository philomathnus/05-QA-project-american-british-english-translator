const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Translation with text and locale fields: POST request to /api/translate', (done) => {
        const orgText = "Paracetamol takes up to an hour to work.";
        const expectedResponse = {
            "text": orgText,
            "translation": "<span class=\"highlight\">Tylenol</span> takes up to an hour to work."
        };
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                "text": orgText,
                "locale": 'british-to-american'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, expectedResponse);
                done();
            });
    });
    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        const orgText = "Paracetamol takes up to an hour to work.";
        const expectedResponse = {
            error: 'Invalid value for locale field'
        };
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                "text": orgText,
                "locale": 'hebrew'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, expectedResponse);
                done();
            });
    });
    test('Translation with missing text field: POST request to /api/translate', (done) => {
        const expectedResponse = {
            error: 'Required field(s) missing'
        };
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                "locale": 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, expectedResponse);
                done();
            });
    });
    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        const expectedResponse = {
            error: 'Required field(s) missing'
        };
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                "text": 'some text'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, expectedResponse);
                done();
            });
    });
    test('Translation with empty text: POST request to /api/translate', (done) => {
        const expectedResponse = {
            error: 'No text to translate'
        };
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                "text": '',
                locale: 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, expectedResponse);
                done();
            });
    });
    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        const orgText = "Paracetamol takes up to an hour to work.";
        const expectedResponse = {
            "text": orgText,
            "translation": "Everything looks good to me!"
        };
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                "text": orgText,
                "locale": 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, expectedResponse);
                done();
            });
    });
});
