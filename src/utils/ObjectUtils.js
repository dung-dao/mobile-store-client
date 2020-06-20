import _ from "lodash";

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
            const path = pipe.path;
            const key = pipe.key;
            if (path.length === 0)
                return res;
            let val = obj[path[0]];
            for (let i = 1; i < path.length; i++) {
                val = val[path[i]];
            }
            res[key] = val;
        });

        return res;
    } catch (e) {
        console.log('Error: ', e);
        console.log('Params: ', obj, pipes, excludes);
    }
}

