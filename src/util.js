module.exports = {
    getBoostTier(level) {
        switch (level) {
            case 'NONE':
            case 0: {
                return 0;
            }
            case 'TIER_1':
            case 1: {
                return 1;
            }
            case 'TIER_2':
            case 2: {
                return 2;
            }
            case 'TIER_3':
            case 3: {
                return 3;
            }
            default: {
                break;
            }
        }
    },
    trimString(string, length = 100) {
        return string.length > length ? string.substring(0, length - 3) + '...' : string;
    }
}