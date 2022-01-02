import express, { Request, Response } from 'express'
import cors from "cors"
import helmet from "helmet"
const compression = require('compression')
const rateLimit = require('express-rate-limit')

interface Handlers {
  getCards: Function;
  getCard: Function;
  addCard: Function;
  updateCard: Function;
  deleteCard: Function;
}

export default function (handlers: Handlers) {
const app = express()
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
  })
  app.use(compression())
  app.use(helmet())
  app.use(cors())
  app.use(limiter)
  app.use(express.json())

  app.get("/", async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    return response.status(200).json({
      message: 'API Documentation: https://github.com/alexmkio/leet-cards-api'
    })
  })

  app.get("/cards", async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    try {
      const allCards = await handlers.getCards()
      response.json(allCards.rows)
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send(error.message)
      }
    }
  })

  app.get("/cards/:id", async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    try {
      const { id } = request.params
      const card = await handlers.getCard(id)
      response.json(card.rows[0])
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send(error.message)
      }
    }
  })
  
  app.post("/cards", async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    try {
      const { question, answer, side, categories } = request.body
      const newCard = await handlers.addCard(question, answer, side, categories)
      response.json(newCard.rows[0])
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send(error.message)
      }
    }
  })
  
  app.put("/cards/:id", async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    try {
      const { id } = request.params
      const { answer } = request.body
      const updateCard = await handlers.updateCard(answer, id)
      response.json("The answer was updated!")
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send(error.message)
      }
    }
  })
  
  app.delete("/cards/:id", async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    try {
      const { id } = request.params
      const deleteCard = await handlers.deleteCard(id)
      response.json("The card has been deleted!")
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send(error.message)
      }
    }
  })

  return app
}