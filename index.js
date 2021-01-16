const createServer = require('./lib/server')
const defaultMimeTypes = require('./lib/mime-types')
const Logger = require('./lib/logger')

module.exports = function startServer({
  sourceFolder = '',
  mimeTypes,
  spa = false
}) {
  const usedMimeTypes = selectMimeTypes(mimeTypes)

  const server = createServer(
    sourceFolder.split('/'),
    usedMimeTypes,
    spa
  )

  return {
    listen(port, startFunction) {
      server.listen(
        port,
        startFunction
          ? startFunction(port)
          : Logger.defaultStart(port)
      )
    }
  }
}

function selectMimeTypes(mimeTypes) {
  if(!mimeTypes) return defaultMimeTypes

  if(typeof mimeTypes === 'function') {
    return mimeTypes(defaultMimeTypes)
  }

  return mimeTypes
}
