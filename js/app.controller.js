import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDeleteLoc = onDeleteLoc
window.onPanTo = onPanTo
window.onCopyLink = onCopyLink

function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready')
            panToQueryStringParams()
        })
        .catch(() => console.log('Error: cannot init map'))

    document.querySelector('.search').addEventListener('submit', onSearchLocs)
}

function onSearchLocs(ev) {
    ev.preventDefault()

    const elInput = document.querySelector('.search input')
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService
        .getLocs()
        .then((locs) => {
            const strHTMLS = locs.map((loc) => {
                console.log(loc)
                return `
             <tr>
                    <td class="name">${loc.name}</td>
                    <td class="create-time">${loc.createdAt}</td>
                    <td class="update-time">${loc.updatedAt}</td>
                    <td class="actions">
                        <button type="button" class="btn-delete" onclick="onDeleteLoc(${loc.id})">Delete</button>
                        <button onclick="onPanTo(${loc.pos.lat}, ${loc.pos.lng})" class="btn-pan">Go</button>
                    </td>
             </tr>
            `
            })
            console.log('Locations:', locs)
            document.querySelector('tbody').innerHTML = strHTMLS.join('')
            // document.querySelector(".locs").innerText = JSON.stringify(locs)
        })
        .catch((err) => {
            console.log(err)
        })
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords)
            const center = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            }
            mapService.getMap().setCenter(center)
        })
        .catch((err) => {
            console.log('err!!!', err)
        })
}

function onDeleteLoc(id) {
    locService.deleteLoc(id)
    onGetLocs()
}

function onPanTo(lat, lng) {
    console.log('Panning the Map', lat, lng)
    mapService.panTo(lat, lng)
}

function onCopyLink() {
    getPosition()
        .then((pos) => {
            const center = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            }
            const queryStringParams = `?lat=${center.lat}&lng=${center.lng}`
            const url = `https://daniel1231234.github.io/travel-tip/${queryStringParams}`
            navigator.clipboard.writeText(url)
        })
        .catch((err) => {
            console.log('err!!!', err)
        })
}

function panToQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const pos = {
        lat: +queryStringParams.get('lat') || '',
        lng: +queryStringParams.get('lng') || '',
    }
    if (pos.lat && pos.lng) onPanTo(pos.lat, pos.lng)
}
