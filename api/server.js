const express = require("express");

const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());
//the server.use has to be below this because otherwise they won't know how to pase json
server.use('/api/accounts', accountsRouter);
// everything that starts with accounts will go to this accountsRouter. 

//This has to be the last one because it is a catch all endpoint
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found',
    })
})

module.exports = server;