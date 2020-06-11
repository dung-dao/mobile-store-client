export function generateKey(dataSource) {
    if (dataSource)
        return dataSource.map(item => ({...item, key: Math.random()}));
    return dataSource;
}