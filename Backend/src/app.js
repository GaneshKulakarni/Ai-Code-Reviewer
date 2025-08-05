const express = require('express');
const aiRoutes = require('./routes/ai.routes');
require('dotenv').config();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("hey there");
})

app.use('/ai', aiRoutes);

module.exports = app;