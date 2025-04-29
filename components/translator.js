const { dot } = require('mocha/lib/reporters/index.js');
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
const { text } = require('body-parser');





class Translator {

    constructor() {
        this.allAmericanToBritish = { ...americanToBritishSpelling, ...americanOnly, ...americanToBritishTitles };
        this.britishToAmericanTitles = { ...this.invertDictionary(americanToBritishTitles) };
        this.allBritishToAmerican = { ...this.invertDictionary(americanToBritishSpelling), ...britishOnly, ...this.britishToAmericanTitles };
    }

    invertDictionary(dict) {
        let invertedDictionary = {};
        for (let key in dict) {
            invertedDictionary[dict[key]] = key
        }
        return invertedDictionary;
    }

    correctTitleCapitalization(wordToTranslate, translatedWord, titlesDictionary) {
        if (titlesDictionary[wordToTranslate.toLowerCase()]) {
            return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
        }
        return translatedWord;
    }

    doTranslate(wordsToTranslate, translatedWords, dictionary, titlesDictionary) {
        //console.log(`textToTranslate: ${wordsToTranslate.join(' ')}, partiallyTranslatedText: ${translatedWords.join(' ')}`);

        if (wordsToTranslate.length === 1) {
            if (dictionary[wordsToTranslate[0].toLowerCase()]) {
                translatedWords.push(this.correctTitleCapitalization(wordsToTranslate[0], dictionary[wordsToTranslate[0]], titlesDictionary));
            } else {
                translatedWords.push(this.correctTitleCapitalization(wordsToTranslate[0], wordsToTranslate[0], titlesDictionary));
            }
            return translatedWords;
        }

        for (let startIndex = 0; startIndex < wordsToTranslate.length; startIndex++) {
            for (let endIndex = wordsToTranslate.length; endIndex >= 0; endIndex--) {
                const currentWords = wordsToTranslate.slice(startIndex, endIndex);
                const currentTextToTranslate = currentWords.join('');
                const currentTranslation = dictionary[currentTextToTranslate.toLowerCase()];
                if (currentTranslation) {
                    //console.log(`Found translation: toTranslate=${currentTextToTranslate}   translation=${currentTranslation}`);
                    translatedWords.push(this.correctTitleCapitalization(currentTextToTranslate, currentTranslation, titlesDictionary));
                    return this.doTranslate(wordsToTranslate.slice(endIndex, wordsToTranslate.length), translatedWords, dictionary, titlesDictionary);
                }
                //console.log(`no translation for: ${currentTextToTranslate}`);
            }
            translatedWords.push(wordsToTranslate[startIndex]);
        }
        return translatedWords;
    }

    replaceTimeStrings(text, translationLocale) {
        const regexp = new RegExp(/2[0-3]|[01]?[0-9][:.][0-5]?[0-9]/g);
        let textWithCorrectTime = text;
        if (regexp.test(text)) {
            const wordsToReplace = text.match(regexp);
            switch (translationLocale) {
                case 'american-to-british':
                    wordsToReplace.forEach(word => {
                        textWithCorrectTime = textWithCorrectTime.replace(word, word.replace(':', '.'));
                    });
                    break;
                case 'british-to-american':
                    wordsToReplace.forEach(word => {
                        textWithCorrectTime = textWithCorrectTime.replace(word, word.replace('.', ':'));
                    });
                    break;
                default:
                    textWithCorrectTime = text;
            }
            return textWithCorrectTime;
        } else {
            return text;
        }
    }

    translate(textToTranslate, translationLocale) {
        const text = this.replaceTimeStrings(textToTranslate, translationLocale);
        let wordsToTranslate = text.split(/\s/g);
        wordsToTranslate = wordsToTranslate.join(' ').split(/(?=[\s,.?])|(?<=[\s,.?])/g);
        switch (translationLocale) {
            case 'american-to-british':
                return this.doTranslate(wordsToTranslate, [], this.allAmericanToBritish, americanToBritishTitles).join('');
            case 'british-to-american':
                return this.doTranslate(wordsToTranslate, [], this.allBritishToAmerican, this.britishToAmericanTitles).join('');
            default:
                return textToTranslate;
        }
    }

}

module.exports = Translator;