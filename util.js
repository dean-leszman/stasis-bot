module.exports = {
    trimString(string, length = 100) {
        return string.length > length ? string.substring(0, length - 3) + '...' : string;
    }
}