const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');
const PORT = process.env.PORT || 6666;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`app has started on port ${PORT}`)
});