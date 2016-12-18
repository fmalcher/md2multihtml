//const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const LTT = require('list-to-tree');
const md = require('markdown').markdown;

// read lines from file
let lines = fs.readFileSync('./sample.md').toString().split('\n');

// transform headlines to objects
let headlines = lines
    .map((l, i) => {
        return { index: i, text: l }
    })
    .filter(l => l.text.startsWith('#'))
    .map(l => {
        l.rank = l.text.search(/[^#]/);
        l.text = l.text
            .substr(l.rank)
            .trim();
        return l;
    });


// initialize root node
let flatList = [
    { index: -1, text: '', rank: 0 }
];
var lastNode = flatList[0];

// get parent node for each headline
for(let i = 0; i < headlines.length; i++) {
    let h = headlines[i];

    if(h.rank > lastNode.rank) {
        h.parent = lastNode.index;
    
    } else if(h.rank == lastNode.rank) {
        h.parent = lastNode.parent;
   
    } else if(h.rank < lastNode.rank) {
        while(h.rank <= lastNode.rank) {
            lastNode = flatList.find(e => e.index == lastNode.parent);
        }
        h.parent = lastNode.index;
    }

    lastNode = h;
    flatList.push(h);
}


// populate tree from flat list
var ltt = new LTT(flatList, {
    key_id: 'index',
    key_parent: 'parent'
});
var tree = ltt.GetTree()[0].child;


// find last line of block
tree = tree.map((e, i, arr) => {
    e.lastLine = (i < arr.length - 1) ? arr[i + 1].index - 1 : lines.length - 1;
    return e;
});


// extract chapters from full file
let chapters = tree.map(e => {
        return {
            index: e.index,
            text: lines.slice(e.index, e.lastLine + 1).join('\n')
        }
    })
    .map(e => {
        e.html = md.toHTML(e.text)
        return e;
    })
    .forEach(e => {
        let filename = './html/' + e.index + '.html';
        fs.writeFileSync(filename, e.html);
    });








console.log(chapters);



