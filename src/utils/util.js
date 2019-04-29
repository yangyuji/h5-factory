
export default {
  createDomID(len) {
    return Number(Math.random().toString().substr(3, len)).toString(36)
  },
  copyObj(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  getSelection(scope) {
    return scope.value.substring(scope.selectionStart, scope.selectionEnd)
  }
}
