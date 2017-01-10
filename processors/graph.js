const path = require('path');

const HTMLBuilder = require('./htmlBuilder');
const TemplateReplacer = require('./templateReplacer');
const FileProcessor = require('./fileProcessor');
const Config = require('../config');


class Graph {
    constructor(flatTree) {
        this.data = {
            nodes: [],
            edges: []
        }

        this.data.nodes = flatTree.map(e => {
            return {
                id: e.index,
                label: e.text || '*'
            }
        });

        this.data.edges = flatTree
            .filter(e => e.parent !== undefined)
            .map(e => {
                return {
                    from: e.parent,
                    to: e.index
                }
            })
    }

    buildAndWriteHTML(file) {
        let values = {
            nodes: JSON.stringify(this.data.nodes),
            edges: JSON.stringify(this.data.edges)
        }   

        let contentHtml = TemplateReplacer.replace('graph.html', values);
        let fullHtml = HTMLBuilder.buildPage(
            '', // TODO
            contentHtml
        );
        FileProcessor.writeToFile(path.join(Config.outputDir, file), fullHtml);

        
    }
}

module.exports = Graph;