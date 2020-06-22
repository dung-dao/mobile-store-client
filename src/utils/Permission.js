export function checkPermission(permissions, action, resource) {
    try {
        return permissions.find(item => (
            (item.action === action || item.action === '*') &&
            item.resource === resource
        ));
    } catch (e) {
        return false;
    }
}
