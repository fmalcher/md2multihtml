class Helpers {
    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    static getFilenameFromPath(myPath) {
        let pathSplit = myPath.split('/');
        return pathSplit[pathSplit.length - 1];
    }
}

module.exports = Helpers;