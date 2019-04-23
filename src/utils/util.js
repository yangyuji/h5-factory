
export default {
  createDomID: function (len) {
    return Number(Math.random().toString().substr(3, len)).toString(36)
  },
  copyObj: function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
