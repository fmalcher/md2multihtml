class NavItem {
    constructor(id, url, linktext, icon, cssclass) {
        this.id = id;
        this.url = url;
        this.linktext = linktext;
        this.cssclass = cssclass || '';
        this.icon = icon || '';
    }
}

module.exports = NavItem;