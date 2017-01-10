const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const Helpers = require('./helpers');
const TemplateReplacer = require('./templateReplacer');


class FileProcessor {
    static moveAssetsToOutDir(assetsDir, outputDir) {
        glob(path.join(__dirname, assetsDir, '*'), (err, files) => {
            files.forEach(file => {
                let fileName = Helpers.getFilenameFromPath(file);
                fs.copySync(file, path.join(__dirname, outputDir, fileName));
            });
        });
    }

    static createAndEmptyDir(dirPath) {
        if(fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach((file, index) => {
                var curPath = path.join(dirPath, file);
                fs.unlinkSync(curPath);
            });
            fs.rmdirSync(dirPath);
        }

        fs.mkdirSync(dirPath);
    }

    static readLinesFromFile(file) {
        return fs.readFileSync(file).toString().split('\n');
    }

    static createIndexRedirect(url) {
        let html = TemplateReplacer.replace('index.html', {url: url})
        this.writeToFile(path.join('./html', 'index.html'), html);
    }

    static writeToFile(file, content) {
        fs.writeFileSync(file, content);
    }


}

module.exports = FileProcessor;