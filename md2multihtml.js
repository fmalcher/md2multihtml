#!/usr/bin/env node

const path = require('path');

const Helpers = require('./classes/helpers');
const FileProcessor = require('./classes/fileProcessor');
const HeadlinesProcessor = require('./classes/headlinesProcessor');
const ChaptersProcessor = require('./classes/chaptersProcessor');
const Graph = require('./classes/graph');
const FlatList = require('./classes/flatList');
const NavItem = require('./classes/navItem');
const Config = require('./config');

const argv = require('minimist')(process.argv.slice(2));
var inputFile = argv['i'] || Config.inputFile;
if(argv['o']) Config.outputDir = argv['o'];




if(argv['delete-outdir'] || argv['d']) {
    FileProcessor.deleteAndCreateDir(path.join(__dirname, Config.outputDir));
}

FileProcessor.createDirIfNotExists(path.join(__dirname, Config.outputDir));
FileProcessor.moveAssetsToOutDir(path.join(__dirname, Config.assetsDir), path.join(__dirname, Config.outputDir));





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


let navItems = chapters.map(ChaptersProcessor.buildNavItem);
navItems.push(new NavItem('graph', 'graph.html', 'Strukturgraph', 'fork'));


chapters.forEach(ChaptersProcessor.buildAndWriteHTML(chapters, navItems));
FileProcessor.createIndexRedirect(chapters[0].hash + '.html');


let graph = new Graph(flatList.flatTree);
graph.buildAndWriteHTML('graph.html', navItems);

