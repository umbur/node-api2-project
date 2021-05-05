// implement your server here
// require your posts router and connect it here
const express = require("express");
const cors = require("cors");

const server = express();

const postsRouter = require("./posts/posts-router");

server.use(express.json());
server.use(cors());
server.use(postsRouter);

module.exports = server;
