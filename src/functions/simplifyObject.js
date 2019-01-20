export function simplifyObject(object) {
    return Object.entries(object).reduce((accumulator, currentValue) => (currentValue[0] && currentValue[1] && currentValue[1] !== "") ? (Object.assign(accumulator, {[`${currentValue[0]}`]: currentValue[1]})): accumulator, {});
}