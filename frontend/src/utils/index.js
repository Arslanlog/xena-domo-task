export const getQueryFromObject = (obj = {}) => {
    const queryParams = [];
    for (const name in obj) {
        if(obj[name]){
            queryParams.push(`${name}=${obj[name]}`);
        }
    }
    return `?${queryParams.join("&")}`
}