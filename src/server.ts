import * as dotenv from "dotenv"
dotenv.config()
import database from './database'
import makeApp from './app'

const app = makeApp(database)

const PORT: number = parseInt(process.env.PORT as string) || 6565

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))