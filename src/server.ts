import * as dotenv from "dotenv"
dotenv.config()
import handlers from './handlers'
import makeApp from './app'

const app = makeApp(handlers)

const PORT: number = parseInt(process.env.PORT as string) || 6565

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = server