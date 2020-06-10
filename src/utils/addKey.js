export function mapWithKey(dataSource) {
    return dataSource.map(item => ({...item, key: Math.random()}))
}