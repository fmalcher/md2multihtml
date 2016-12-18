const path = require('path');
const md = require('markdown').markdown;

const HTMLBuilder = require('./htmlBuilder');
const TemplateReplacer = require('./templateReplacer');
const FileProcessor = require('./fileProcessor');
const Config = require('./config');


class ChaptersProcessor {
    static insertlastLine(lines) {
        return (e, i, arr) => {
            e.lastLine = (i < arr.length - 1) ? arr[i + 1].index - 1 : lines.length - 1;
            return e;
        }
    }

    static treeNodeToChapter(e) {
        return {
            index: e.index,
            headline: e.text,
            hash: e.hash
        }
    }

    static getContentFromLines(lines) {
        return e => {
            e.content = lines.slice(e.index, e.lastLine + 1).join('\n');
            return e;
        }
    }

    static updateLinks(flatList) {
        return e => {
            let regex = /\[(.*?)\]\(#(.*?)\)/g;

            var m;
            do {
                m = regex.exec(e.content);
                if(m) {
                    let [fullLink, linkText, label] = m;

                    let chapterNode = flatList.findChapterByLabel(label);
                    if(!chapterNode) continue;

                    let destFile = chapterNode.hash + '.html';
                    let newLink = `[${linkText}](${destFile}#${label})`;
                    
                    e.content = e.content.replace(fullLink, newLink);
                }
            } while(m)

            return e;
        }
    }

    static insertHTMLTree(e) {
        e.htmlTree = md.toHTMLTree(e.content)
        return e;
    }

    static updateHeadlinesWithIds(e) {
        e.htmlTree = e.htmlTree.map(h => {
            let [tagName, content] = h;
            var matches;
            if(tagName.match(/h[0-9]/) && (matches = content.match(/(.*)\{label-(.*?)\}/))) {
                let [, headlineText, label] = matches;
                h = [tagName, {id: label}, headlineText];
            }
            return h;
        });

        return e;
    }

    static insertHtml(e) {
        e.html = md.renderJsonML(e.htmlTree);
        return e;
    }

    static buildAndWriteHTML(chapters) {
        return e => {
            let fullHtml = HTMLBuilder.buildPage(
                HTMLBuilder.buildNavForChapter(chapters, e.index, 'listelement.html'),
                e.html
            );
            FileProcessor.writeToFile(path.join(Config.outputDir, e.hash + '.html'), fullHtml);
        }
    }
}

module.exports = ChaptersProcessor;