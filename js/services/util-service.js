export const utilService = {
  getTime,
  makeId,
}

function getTime() {
  var str = ""
  var time = new Date()
  str += time.getHours() + ":"
  str += time.getMinutes() + ":"
  str += time.getSeconds()
  return str
}

function makeId(length = 5) {
  var txt = ""
  var possible = "0123456789"
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
