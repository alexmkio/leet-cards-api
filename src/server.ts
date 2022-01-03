import express from 'express'
const app = express()
import compression from 'compression'
import helmet from "helmet"
import cors from "cors"
import rateLimit from 'express-rate-limit'
import * as dotenv from "dotenv"
dotenv.config()
import router from './router'

app.use(compression())

app.use(helmet())

app.use(cors())

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
})
app.use(limiter)

const PORT: number = parseInt(process.env.PORT as string) || 6565

app.use(router)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default app