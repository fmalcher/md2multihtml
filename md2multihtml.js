const Helpers = require('./helpers');
const FileProcessor = require('./fileProcessor');
const HeadlinesProcessor = require('./headlinesProcessor');
const ChaptersProcessor = require('./chaptersProcessor');
const FlatList = require('./flatList');
const Config = require('./config');

const argv = require('minimist')(process.argv.slice(2));
var inputFile = argv._[0] || './sample.md';



FileProcessor.createAndEmptyDir(Config.outputDir);
FileProcessor.moveAssetsToOutDir(Config.assetsDir, Config.outputDir);

let lines = FileProcessor.readLinesFromFile(inputFile);


// transform headlines to objects
let headlines = lines
    .map((l, i) => {
        return { index: i, text: l }
    })
    .filter(l => l.text.startsWith('#'))
    .map(HeadlinesProcessor.insertRank)
    .map(HeadlinesProcessor.parseLabelComments(lines))
    .map(HeadlinesProcessor.insertHash);


// add label to headline
// Format: Headline text{label-mylabel}
headlines
    .filter(e => e.label)
    .forEach(e => {
        lines[e.index] += '{label-' + e.label + '}';
    });



let flatList = new FlatList(headlines);
let tree = flatList.buildTree();


let chapters = tree
    .map(ChaptersProcessor.treeNodeToChapter)
    .map(ChaptersProcessor.insertlastLine(lines))
    .map(ChaptersProcessor.getContentFromLines(lines))
    .map(ChaptersProcessor.updateLinks(flatList))
    .map(ChaptersProcessor.insertHTMLTree)
    .map(ChaptersProcessor.updateHeadlinesWithIds)
    .map(ChaptersProcessor.insertHtml);


chapters.forEach(ChaptersProcessor.buildAndWriteHTML(chapters, Config.outputDir));
FileProcessor.createIndexRedirect(chapters[0].hash + '.html');

