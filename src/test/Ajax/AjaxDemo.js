(function () {
  // console.log('ajax')
  // Ajax.get({
  //   url: 'data.json',
  //   msg: '第一次调用',
  //   fnCb: function (stResText) {
  //     console.log(stResText)
  //     Ajax.get({
  //       url: 'data.json',
  //       msg: '第二次调用',
  //       fnCb: function (stResText) {
  //         console.log(stResText)
  //       }
  //     })
  //   }
  // })
  var tqTask = new TaskQueue()
  tqTask.appendTask(function (tqArgTask) {
    Ajax.getByTQ(tqArgTask, {
      url: 'data.json',
      msg: '第一次调用'
    })
  })
})()
