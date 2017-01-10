const TemplateReplacer = require('./templateReplacer');

class HTMLBuilder {
    static buildNavForChapter(chapters, activeIndex, listTemplateFile) {
        var navHtml = '';

        chapters.forEach(e => {
            let values = {
                url: e.hash + '.html',
                linktext: e.headline,
                liclass: (e.index == activeIndex) ? 'active' : ''
            }   

            navHtml += TemplateReplacer.replace(listTemplateFile, values);
        });

        return navHtml;
    }

    static buildPage(nav, content) {
        let values = {
            nav: nav,
            content: content
        }

        return TemplateReplacer.replace('skeleton.html', values);
    }
}

module.exports = HTMLBuilder;