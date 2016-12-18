const fs = require('fs');

class TemplateReplacer {
    static replace(filename, values) {
        let tpl = fs.readFileSync('./templates/' + filename).toString();

        for(let key in values) {
            tpl = TemplateReplacer.replaceAll(tpl, '\{' + key + '\}', values[key]);
        }
        return tpl;
    }

    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}





module.exports = TemplateReplacer;