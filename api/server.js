const express = require("express");
const PostRouter = require("./PostRouter")

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use('/api/posts', PostRouter)


module.exports = server;
