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

module.exports = db