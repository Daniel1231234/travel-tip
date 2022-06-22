import { storageService } from "./storage-service.js"

export const locService = {
  getLocs,
  createLoc,
  setLoc,
  deleteLoc,
}

const LOCS_KEY = "locsDB"
var gId = 1
var gLocations = storageService.load(LOCS_KEY) || []
// const locs = [{ id: 1, name: "Greatplace", lat: 32.047104, lng: 34.832384 }]

function createLoc({ lat, lng }) {
  const loc = {
    id: gId++,
    name: prompt("Place name?"),
    pos: { lat, lng },
    weather: "",
    createdAt: Date.now(),
    updatedAt: 0,
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
