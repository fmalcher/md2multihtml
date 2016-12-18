//const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const LTT = require('list-to-tree');


let lines = fs.readFileSync('./sample.md').toString().split('\n');
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




let result = [
    {
        index: -1,
        text: '',
        rank: 0
    }
];
var lastNode = result[0];

for(let i = 0; i < headlines.length; i++) {
    let h = headlines[i];

    if(h.rank > lastNode.rank) {
        h.parent = lastNode.index;
        lastNode = h;
        result.push(h);
    
    } else if(h.rank == lastNode.rank) {
        h.parent = lastNode.parent;
        lastNode = h;
        result.push(h);
   
    } else if(h.rank < lastNode.rank) {
        while(h.rank <= lastNode.rank) {
            lastNode = result.find(e => e.index == lastNode.parent);
        }
        h.parent = lastNode.index;
        lastNode = h;
        result.push(h);
    }
}

var ltt = new LTT(result, {
    key_id: 'index',
    key_parent: 'parent'
});
var tree = ltt.GetTree()[0].child;


// find last line of block
tree = tree.map((e, i, arr) => {
    e.lastLine = (i < arr.length - 1) ? arr[i + 1].index - 1 : lines.length - 1;
    return e;
});





console.log(tree);



console.log(JSON.stringify(tree));
