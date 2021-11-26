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

app.post("/cards", async (request, response) => {
  try {
    const { question, answer, side, categories } = request.body;
    const newCard = await db.query(
      "INSERT INTO cards (question, answer, side, categories) VALUES($1, $2, $3, $4) RETURNING *",
      [question, answer, side, categories]
    );
    response.json(newCard.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/cards/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { answer } = request.body;
    const updateCard = await db.query(
      "UPDATE cards SET answer = $1 WHERE id = $2",
      [answer, id]
    );
    response.json("The answer was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/cards/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteCard = await db.query("DELETE FROM cards WHERE id = $1", [
      id
    ]);
    response.json("The card has been deleted!");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`app has started on port ${PORT}`)
});