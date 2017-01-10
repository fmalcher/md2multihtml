const TemplateReplacer = require('./templateReplacer');

class HTMLBuilder {
    static buildNavHTML(navItems, listTemplateFile, activeId) {
        var navHtml = '';

        navItems.forEach(itemO => {
            let item = Object.assign({}, itemO);
            if(item.id === activeId) {
                item.liclass = 'active';
            };
            navHtml += TemplateReplacer.replace(listTemplateFile, item);
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