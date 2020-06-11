export function generateKey(dataSource) {
    return dataSource.map(item => ({...item, key: Math.random()}))
}