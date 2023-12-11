// set item
export const setToLocalStorage = (key, token ) => {
if(!key || typeof window === 'undefined'){
    return ""
}
console.log(key, token, 'from local')
return localStorage.setItem(key, token)
}

// get item
export const getFromLocalStorage = (key) => {
if(!key || typeof window === 'undefined'){
    return ""
}
return localStorage.getItem(key)
}