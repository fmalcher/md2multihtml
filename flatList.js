const LTT = require('list-to-tree');


class FlatList {
    constructor(elements) {
        this.elements = elements;
        
        this.flatTree = [
            { index: -1, text: '', rank: 0 }
        ];
        this.lastNode = this.flatTree[0];

        this.buildFlatTree();
    }

    buildFlatTree() {        
        // get parent node for each headline
        for(let i = 0; i < this.elements.length; i++) {
            let h = this.elements[i];

            if(h.rank > this.lastNode.rank) {
                h.parent = this.lastNode.index;
            
            } else if(h.rank == this.lastNode.rank) {
                h.parent = this.lastNode.parent;
        
            } else if(h.rank < this.lastNode.rank) {
                while(h.rank <= this.lastNode.rank) {
                    this.lastNode = this.flatTree.find(e => e.index == this.lastNode.parent);
                }
                h.parent = this.lastNode.index;
            }

            this.lastNode = h;
            this.flatTree.push(h);
        }
        return this.flatTree;
    }

    buildTree() {
        // populate tree from flat tree
        var ltt = new LTT(this.flatTree, {
            key_id: 'index',
            key_parent: 'parent'
        });
        this.tree = ltt.GetTree()[0].child;
        return this.tree;
    }

    findChapterByLabel(label) {
        var lastChapterNode = null;
        
        for(let i = 0; i < this.flatTree.length; i++) {
            let e = this.flatTree[i];
            
            if(e.rank == 1) {
                lastChapterNode = e;
            }

            if(e.label == label) {
                return lastChapterNode;
            }
        }
    } 
}

module.exports = FlatList;