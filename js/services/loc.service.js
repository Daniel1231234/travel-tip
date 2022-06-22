import { storageService } from "./storage-service.js"

export const locService = {
  getLocs,
  createLoc,
}

var gId = 1
var gLocations
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

// function getLocs() {
function getLocs() {
  new Promise((resolved, rejected) => {})
  gLocations = storageService.load(gLocations) || []
}

// const locs = [
//   { name: "Greatplace", lat: 32.047104, lng: 34.832384 },
//   { name: "Neveragain", lat: 32.047201, lng: 34.832581 },
// ]
