export function removeEmptyFromObject(someObject) {
    return new Promise((resolve, reject) => {
        try {
            let entries = Object.entries(someObject);
            let realObject = {};
            for (let i = 0; i < entries.length; i++) {
                if (entries[i][0] && entries[i][1] && entries[i][1] !== "") {
                    realObject[entries[i][0]] = entries[i][1];
                }
            }
            resolve(realObject);
        }
        catch (error) {
            reject(error);
        }
    })
}