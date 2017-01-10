class NavItem {
    constructor(id, url, linktext, liclass) {
        this.id = id;
        this.url = url;
        this.linktext = linktext;
        this.liclass = liclass || '';
    }
}

module.exports = NavItem;