const express = require('express')
const postsRouter = require('./posts/posts-router')
// implement your server here
// require your posts router and connect it here

const server = express();

server.use(express.json())
server.use('/api/posts', postsRouter)

module.exports = server;