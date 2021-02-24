module.exports = {
    getEmoji: function(type) {
        switch (type.toLowerCase()) {
            case "one":
            case "1":
                return ":one:";
            case "smile":
                return "😄";
            default:
                return "";
        }
    },
    getRandomNumber: function(max) {
        if (!max) max = 1;
    
        return Math.floor((Math.random() * max) + 1);
    }
}