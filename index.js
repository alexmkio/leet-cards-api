const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');
const PORT = process.env.PORT || 6666;

app.use(cors());
app.use(express.json());

app.get("/cards", async (request, response) => {
  try {
    const allCards = await db.query("SELECT * FROM cards");
    response.json(allCards.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`app has started on port ${PORT}`)
});