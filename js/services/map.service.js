import { locService } from "./loc.service.js"

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getMap,
  searchLocs,
}

var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  //   console.log("InitMap")
  return _connectGoogleApi().then(() => {
    // console.log("google available")
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    })
    // console.log("Map!", gMap)

    //////
    gMap.addListener("click", ({ latLng: { lat, lng } }) => {
      const position = { lat: lat(), lng: lng() }
      saveLoc(position)
    })
  })
}

function saveLoc(pos) {
  const locName = prompt("Place name?")
  const loc = locService.createLoc(pos, locName)
  console.log(loc)
  locService.setLoc(loc)
  addMarker(pos, loc)
}

function addMarker(pos, loc) {
  var marker = new google.maps.Marker({
    position: pos,
    map: gMap,
    title: loc.name,
  })
  const infoWindow = new google.maps.InfoWindow({
    content: loc.name,
  })
  marker.addListener("click", () => {
    infoWindow.close()

    infoWindow.open({
      anchor: marker,
      map: gMap,
      shouldFocus: false,
    })
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = "AIzaSyBmm1sx7BaEs-BeeygbfB_cFwMLFfvyX6o"
  var elGoogleApi = document.createElement("script")
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject("Google script failed to load")
  })
}

function getMap() {
  return gMap
}

function searchLocs(val) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${val}&key=AIzaSyAjlgFK0ZA3bPcJwKGVSJMLO7JCNku_VRI`
    )
    .then(({ data }) => data.results[0].geometry.location)
}
