var { getOptions } = require('loader-utils')

module.exports = function (source) {
  var options = getOptions(this)
  var name = options.name || '[name]-[index]'
  var illustratorClass = options.illustratorClass || 'cls'
  var remove = options.remove || {}
  var exportStyle = options.exportStyle || 'default'
  var defaultName = options.defaultName

  if (exportStyle === 'name' && !defaultName) {
    throw new Error('if exportStyle is a name, defaultName is required')
  }

  if (exportStyle !== 'name' && defaultName) {
    throw new Error('if exportStyle is not a name, defaultName is not needed')
  }

  source = JSON.stringify(source)

  var titlePattern = /<title>(.+)<\/title>/
  var match = source.match(titlePattern)
  var iconName = (match) ? match[1] : defaultName

  source = source
    .replace(new RegExp('(\\.)?' + illustratorClass + '-(\\d+)', 'g'), function (_, dot, iconIndex) {
      return ((dot || '') + name)
        .replace('[name]', iconName)
        .replace('[index]', iconIndex)
    })

  if (remove.title) {
    source = source.replace(titlePattern, '')
  }

  if (remove.xmlns) {
    source = source.replace(' xmlns="http://www.w3.org/2000/svg"', '')
  }

  if (remove.space) {
    source = source
      .replace(/[\r\n]+/g, '')
      .replace(/\s{2,}/g, '')
      .replace(/: /g, ':')
  }

  exportStyle =
    (exportStyle === 'none') ? '' :
    (exportStyle === 'name') ? '.' + iconName : '.default'
  return 'module.exports' + exportStyle + ' = ' + source
}
