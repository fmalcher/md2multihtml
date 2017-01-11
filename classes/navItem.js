class NavItem {
    constructor(id, url, linktext, cssclass) {
        this.id = id;
        this.url = url;
        this.linktext = linktext;
        this.cssclass = cssclass || '';
    }
}

module.exports = NavItem;