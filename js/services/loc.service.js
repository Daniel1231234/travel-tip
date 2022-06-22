import { storageService } from "./storage-service.js"
import { utilService } from "./util-service.js"
// import { mapService } from "./map.service.js"

export const locService = {
  getLocs,
  createLoc,
  setLoc,
  deleteLoc,
}

const LOCS_KEY = "locsDB"

// var gLocations = storageService.load(LOCS_KEY) || []
var gLocations = storageService.load(LOCS_KEY) || [createLoc({ lat: 21.315603, lng: -157.858093 })]
// const locs = [{ id: 1, name: "Greatplace", lat: 32.047104, lng: 34.832384 }]

function createLoc({ lat, lng }, name = 'My place') {
  const loc = {
    id: utilService.makeId(),
    name,
    pos: { lat, lng },
    weather: "",
    createdAt: utilService.getTime(),
    updatedAt: utilService.getTime(),
  }
  console.log(loc)
  return loc
}

function setLoc(loc) {
  gLocations.push(loc)
  storageService.save(LOCS_KEY, gLocations)
  console.log(gLocations)
}

// function getLocs() {
function getLocs() {
  return new Promise((resolve) => resolve(gLocations))
}

function deleteLoc(id){
  const idx = gLocations.findIndex(loc => loc.id === id)
  gLocations.splice(idx, 1)
}

// const locs = [
//   { name: "Greatplace", lat: 32.047104, lng: 34.832384 },
//   { name: "Neveragain", lat: 32.047201, lng: 34.832581 },
// ]
