'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();
  const validLocales = ['american-to-british', 'british-to-american'];

  app.route('/api/translate')
    .post((req, res) => {
      if (!Object.hasOwn(req.body, "text") || !Object.hasOwn(req.body, "locale")) {
        res.json({ error: 'Required field(s) missing' });
      } else {
        const textToTranslate = req.body.text;
        const locale = req.body.locale;
        
        if (!textToTranslate) {
          res.json({ error: 'No text to translate' });
        } else if (!validLocales.includes(locale)) {
          res.json({ error: 'Invalid value for locale field' });
        } else {
          const translation = translator.translateAndHighlight(textToTranslate, locale);
          if (textToTranslate === translation) {
            res.json({
              text: textToTranslate,
              translation: 'Everything looks good to me!'
            });
          } else {
            res.json({
              text: textToTranslate,
              translation: translation
            });
          }
        }
  
      }
    });
};
