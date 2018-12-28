export function simplifyObject(object: object) {
    return Object.entries(object).reduce((accumulator: object, currentValue: any) => (currentValue[0] && currentValue[1] && currentValue[1] != "") ? (Object.assign(accumulator, {[`${currentValue[0]}`]: currentValue[1]})): accumulator, {});
}