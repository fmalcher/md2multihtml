const fs = require('fs');
const path = require('path');

const Helpers = require('./helpers');
const Config = require('./config');

class TemplateReplacer {
    static replace(filename, values) {
        let tpl = fs.readFileSync(path.join(Config.templateDir, filename)).toString();

        Object.keys(values).forEach(key => {
            tpl = Helpers.replaceAll(tpl, '\{' + key + '\}', values[key]);
        });
        return tpl;
    }
}

module.exports = TemplateReplacer;