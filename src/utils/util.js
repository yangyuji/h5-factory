
function padding(s, len) {
  var len = len - (s + '').length
  for (var i = 0; i < len; i++) {
    s = '0' + s
  }
  return s
}

export default {
  createDomID: function (len) {
    return Number(Math.random().toString().substr(3, len)).toString(36)
  },
  copyObj: function (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  getRepeatStyle: function (id) {
    switch (id) {
      case 1:
        return 'no-repeat'
      case 2:
        return 'repeat-x'
      case 3:
        return 'repeat-y'
      case 4:
        return 'repeat'
      default:
        return 'no-repeat'
    }
  }
}
