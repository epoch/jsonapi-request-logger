// middleware for logging requests

function dim(text) {
  return `\x1b[2m${text}\x1b[0m`
}

function pink(text) {
  return `\x1b[35m${text}\x1b[0m`
}

function yellow(text) {
  return `\x1b[33m${text}\x1b[0m`
}

function cyan(text) {
  return `\x1b[36m${text}\x1b[0m`
}

function truncate(str, length = 28) {
  if (str.length <= length) {
    return str
  } else {
    return `${str.slice(0, length)}...`
  }
}

function truncateObjectValues(body, indent = 2) {
  return  Object.entries(body).reduce((obj, [k, v]) => {
    obj[k] = typeof v === 'string' 
      ? truncate(v, process.stdout.columns - 9 - 3 - indent - k.length) 
      : truncateObjectValues(v, indent + 2)
    return obj
  }, {})
}

function timeStampLine(timestamp) {
  let line = process.stdout.columns - 2
  let timeWithBrackets = `[ ${timestamp} ]`

  let leftSize = (line - timeWithBrackets.length) / 2

  let left = '-'.repeat(leftSize)
  let right = '-'.repeat(line - left.length - timeWithBrackets.length)

  return `+${left}${timeWithBrackets}${right}+`
}

function logRequest({ req, method, url, timestamp, json = false}) {

  let entry = ''

  entry += `${dim(timeStampLine(timestamp))}\n`
  entry += `${yellow(method)} ${cyan(url)}\n`

  if (json) {
    entry += `\n${pink('body')} ${json}\n`
  }

  console.log(entry)
}

function requestLogger(req, res, next) {
  const { method, url, body } = req
  const timestamp = new Date().toLocaleTimeString()

  if (Object.keys(body).length > 0) {
    let truncatedBody = truncateObjectValues(body)
    const json = JSON.stringify(truncatedBody, null, 2)
    logRequest({ method, url, timestamp, json, req })
  } else {
    logRequest({ method, url, timestamp, req })
  }

  next()
}

module.exports = requestLogger;
