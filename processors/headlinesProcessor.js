const md5 = require('md5');

class HeadlineProcessor {
    static insertRank(l) {
        l.rank = l.text.search(/[^#]/);
        l.text = l.text
            .substr(l.rank)
            .trim();
        return l;
    }

    static insertHash(l) {
        l.hash = md5(l.index + l.text);
        return l;
    }

    static parseLabelComments(linesArray) {
        return l => {
            let labelLineIndex = l.index + 1;
            let matches = linesArray[labelLineIndex].match(/<!--\ ?label:\ ?(.*)\ ?-->/)
            
            if(matches) {
                l.label = matches[1].trim();
                linesArray[labelLineIndex] = '';
            } else {
                l.label = null;
            }
            return l;
        }
    } 
}

module.exports = HeadlineProcessor;