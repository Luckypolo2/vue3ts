var Ajax = {};

(function() {
  Ajax.get = function(iOption) {
    iOption = iOption || {}
    if (!iOption.url) {
      return
    }
    iOption.msg && console.log(iOption.msg)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', iOption.url, true)
    xhr.onreadystatechange = function() {
      if (4 !== xhr.readyState) {
        return
      }
      if (200 === xhr.status) {
        iOption.fnCb && iOption.fnCb(xhr.responseText)
      }
    }
    xhr.send(null)
  }
  Ajax.getByTQ = function(tqTask,iOption) {
    iOption = iOption || {}
    if (!iOption.url) {
      return
    }
    iOption.msg && console.log(iOption.msg)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', iOption.url, true)
    xhr.onreadystatechange = function() {
      if (4 !== xhr.readyState) {
        return
      }
      if (200 === xhr.status) {
        tqTask.setData('data', xhr.responseText)
        tqTask.goNext()
      }
    }
    xhr.send(null)
  }
})()
