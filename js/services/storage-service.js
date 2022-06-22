export const storageService = {
    save: saveToStorage,
    load: loadFromStorage
  }  

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}