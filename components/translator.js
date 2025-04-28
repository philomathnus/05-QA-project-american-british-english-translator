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

    isTimeString(str) {
        const regexp = /^(2[0-3]|[01]?[0-9])[:.]([0-5]?[0-9])$/;
        console.log(`str: ${str}  result: ${regexp.test(str)}`);
        return regexp.test(str);
    }

    translateTimeString(words, translationLocale) {
        const newWords = [];

        words.forEach(word => {
            console.log(`word: ${word}`);
            if (this.isTimeString(word)) {
                switch (translationLocale) {
                    case 'american-to-british':
                        newWords.push(word.replaceAll(':', '.'));
                        break;
                    case 'british-to-american':
                        newWords.push(word.replaceAll('.', ':'));
                        break;
                    default:
                        newWords.push(word);
                }
            } else {
                newWords.push(word);
            }
        });
        return newWords;
    }

    translate(textToTranslate, translationLocale) {
        let wordsToTranslate = textToTranslate.split(/(?=[\s,.?])|(?<=[\s,.?])/g);
        wordsToTranslate = this.translateTimeString(wordsToTranslate, translationLocale);
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