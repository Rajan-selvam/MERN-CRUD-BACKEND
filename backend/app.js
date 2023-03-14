const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoutes");

app.use("/api", user);

module.exports = app;