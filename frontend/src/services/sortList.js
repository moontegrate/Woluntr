const sortListByField = (arr, fieldName, reverse) => {
    if (reverse) {
        return [...arr].sort((a, b) => {
            if (a[fieldName] > b[fieldName]) {
                return -1;
            }
            if (a[fieldName] < b[fieldName]) {
                return 1;
            }
            return 0;
        });
    } else {
        return [...arr].sort((a, b) => {
            if (a[fieldName] < b[fieldName]) {
                return -1;
            }
            if (a[fieldName] > b[fieldName]) {
                return 1;
            }
            return 0;
        });
    }
};

export default sortListByField;