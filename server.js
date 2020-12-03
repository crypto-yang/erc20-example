const express = require('express');

const server = express();

server.use(express.static('public'))
server.use(express.static('build'))

server.listen(8000, () => {
  console.log('app started on localhost:8000')
})