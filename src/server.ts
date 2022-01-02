const express = require('express')
const app = express()
import router from './router'
import cors from "cors"
import helmet from "helmet"
const compression = require('compression')
const rateLimit = require('express-rate-limit')
import * as dotenv from "dotenv"
dotenv.config()

app.use(compression())
app.use(helmet())
app.use(cors())
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
})
app.use(limiter)
app.use(express.json())

const PORT: number = parseInt(process.env.PORT as string) || 6565

app.use(router)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

// module.exports = server