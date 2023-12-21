

export function saveObject(key = "", value = "") {
    if (window && window.localStorage) {
        window.localStorage.setItem(key, value);
    }
}

export function getObject(name) {
    if (window && window.localStorage) {
        return window.localStorage.getItem(name);
    }
    return false;
}

export function removeObject(key) {
    localStorage.removeItem(key);
}
