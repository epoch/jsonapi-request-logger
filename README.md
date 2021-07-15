# JSON API request logger

Development HTTP request logger middleware for express.js JSON APIs

## Installation

```sh
$ npm install jsonapi-request-logger
```

## Quick start

```js
const express = require('express')
const requestLogger = require('jsonapi-request-logger')
const app = express()

app.use(requestLogger)
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)
```

## Liscense

[MIT](LICENSE)