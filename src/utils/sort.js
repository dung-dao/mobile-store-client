export const sort = function (field) {
    return (a, b) => {
        if (typeof a[field] === 'string')
            return a[field].localeCompare(b[field]);
        else
            return a[field] - b[field];
    }
}

