class FlatListHelper {
    static findChapterByLabel(label, flatList) {
        var lastChapterNode = null;
        
        for(let i = 0; i < flatList.length; i++) {
            let e = flatList[i];
            
            if(e.rank == 1) {
                lastChapterNode = e;
            }

            if(e.label == label) {
                return lastChapterNode;
            }
        }
    } 
}

module.exports = FlatListHelper;