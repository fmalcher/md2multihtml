const TemplateReplacer = require('./templateReplacer');

class HTMLBuilder {
    static buildNavForChapter(chapters, activeIndex, listTemplateFile) {
        var navHtml = '';

        chapters.forEach(e => {
            let values = {
                url: e.filename,
                linktext: e.headline,
                liclass: (e.index == activeIndex) ? 'active' : ''
            }   

            navHtml += TemplateReplacer.replace(listTemplateFile, values);
        });

        return navHtml;
    }
}

module.exports = HTMLBuilder;