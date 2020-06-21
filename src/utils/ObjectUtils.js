export function generateKey(dataSource) {
    if (dataSource)
        return dataSource.map(item => ({...item, key: Math.random()}));
    return dataSource;
}

export function mapNestedObject(obj = {}, pipes = [], excludes = []) {
    try {
        const res = {};
        Object.keys(obj).forEach(key => {
            if (excludes && excludes.find(k => k === key)) return;
            res[key] = obj[key];
        });
        pipes.forEach(pipe => {
            try {
                const path = pipe.path;
                const key = pipe.key;
                if (path.length === 0)
                    return res;
                let val = obj[path[0]];
                for (let i = 1; i < path.length; i++) {
                    val = val[path[i]];
                }
                res[key] = val;
            } catch (e) {
            }
        });

        return res;
    } catch (e) {
        console.log('Error: ', e);
        console.log('Params: ', obj, pipes, excludes);
    }
}

export function formatToCurrency(str) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return formatter.format(str);
}

export const createLabel = (action = "", resourceLabel = "") => {
    switch (action) {
        case 'VIEW':
            return `Chi tiết ${resourceLabel.toLowerCase()}`;
        case 'UPDATE':
            return `Cập nhật ${resourceLabel}`;
        case 'CREATE':
            return `Tạo  ${resourceLabel}`
        default:
            return null;
    }
}
