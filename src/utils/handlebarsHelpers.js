import handlebars from 'handlebars'

export default {
  activate: function () {
    const blocks = {}

    handlebars.registerHelper('extend', (name, options) => {
      blocks[name] = [] // init the blocks[name] property
      blocks[name].push(options.fn(this))
    })

    handlebars.registerHelper('block', (name) => {
      return blocks[name] || []
    })
  }
}
