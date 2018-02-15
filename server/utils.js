module.exports = {
    parseRegExpInQuery: (query) => {
        let newQuery = {}
        for (key in query) {
            if (~query[key].indexOf('/')) {
                newQuery[key] = new RegExp(query[key].replace(/\//g, ''))
            } else {
                newQuery[key] = query[key]
            }
        }
        return newQuery
    }
}