import * as dotenv from "dotenv"
dotenv.config()
import Pool from 'pg-pool'

const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  var db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  db.connect()
} else {
  var db = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: parseInt(process.env.PG_PORT as string),
  })
}

const getCards = async () => {
  const allCards = await db.query("SELECT * FROM cards")
  return allCards
}

const getCard = async (id: number) => {
  const card = await db.query("SELECT * FROM cards WHERE id = $1",
    [id]
  )
  return card
}

const addCard = async (
    question: string,
    answer: string,
    side: string,
    categories: string
  ) => {
  const allCards = await db.query(
    "INSERT INTO cards (question, answer, side, categories) VALUES($1, $2, $3, $4) RETURNING *",
    [question, answer, side, categories]
  )
  return allCards
}

const updateCard = async (answer: string, id: number) => {
  const update = await db.query(
    "UPDATE cards SET answer = $1 WHERE id = $2",
    [answer, id]
  )
  return update
}

const deleteCard = async (id: number) => {
  const deleted = await db.query("DELETE FROM cards WHERE id = $1", [
    id
  ])
  return deleted
}

const handlers = { getCards, getCard, addCard, updateCard, deleteCard }
export default handlers