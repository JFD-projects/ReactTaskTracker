export function objectToArray(object) {
    if (Array.isArray(object)) return object;
    if (typeof object === 'object' && object !== null) {
        return Object.keys(object).map((key) => ({...object[key], _id: key}))
    }
    return []
}