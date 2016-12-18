const fs = require('fs');

const Helpers = require('./helpers');

class TemplateReplacer {
    static replace(filename, values) {
        let tpl = fs.readFileSync('./templates/' + filename).toString();

        for(let key in values) {
            tpl = Helpers.replaceAll(tpl, '\{' + key + '\}', values[key]);
        }
        return tpl;
    }
}

module.exports = TemplateReplacer;