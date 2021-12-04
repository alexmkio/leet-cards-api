/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import cors from "cors";
import helmet from "helmet";
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')
import Pool from 'pg-pool';

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Database Connection
 */

if (isProduction) {
  var db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  db.connect();
} else {
  var db = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: parseInt(process.env.PG_PORT as string),
  });
};

db

// should I ever close this connection with:
// db.end()

/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string) || 6565;
const app = express();

/**
 *  App Configuration
 */

const origin = {
  origin: isProduction ? 'https://leet-cards.vercel.app' : '*',
}

app.use(compression())
app.use(helmet());
app.use(cors(origin));
app.use(express.json());

/**
 * Routes
 */

app.get("/cards", async (request: Request, response: Response) => {
  try {
    const allCards = await db.query("SELECT * FROM cards");
    response.json(allCards.rows);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

app.get("/cards/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const card = await db.query("SELECT * FROM cards WHERE id = $1",
      [id]
    );
    response.json(card.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

app.post("/cards", async (request: Request, response: Response) => {
  try {
    const { question, answer, side, categories } = request.body;
    const newCard = await db.query(
      "INSERT INTO cards (question, answer, side, categories) VALUES($1, $2, $3, $4) RETURNING *",
      [question, answer, side, categories]
    );
    response.json(newCard.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

app.put("/cards/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { answer } = request.body;
    const updateCard = await db.query(
      "UPDATE cards SET answer = $1 WHERE id = $2",
      [answer, id]
    );
    response.json("The answer was updated!");
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

app.delete("/cards/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deleteCard = await db.query("DELETE FROM cards WHERE id = $1", [
      id
    ]);
    response.json("The card has been deleted!");
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});