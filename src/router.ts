import express, { Request, Response } from 'express'
const router = express.Router()
import { body, validationResult } from 'express-validator'
import Controller from './controller'
router.use(express.json())

router.get("/", async (request: Request, response: Response) => {
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

router.get("/cards", async (request: Request, response: Response) => {
  if (request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({
      status: 'error',
      message: 'Unauthorized.'
    })
  }
  try {
    const allCards = await Controller.getCards()
    response.json(allCards.rows)
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message)
    }
  }
})

router.get("/cards/:id", async (request: Request, response: Response) => {
  if (request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({
      status: 'error',
      message: 'Unauthorized.'
    })
  }
  try {
    const { id } = request.params
    const card = await Controller.getCard(id)
    response.json(card.rows[0])
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message)
    }
  }
})

router.post("/cards",
  body('question', 'The question must be a string with length')
    .exists().withMessage('A key of question must exist')
    .if(body('question').exists()).isString().notEmpty(),
  body('answer', 'The answer must be a string with length')
    .exists().withMessage('A key of answer must exist')
    .if(body('answer').exists()).isString().notEmpty(),
  body('side', 'The side must be a string with length')
    .exists().withMessage('A key of side must exist')
    .if(body('side').exists()).isString().notEmpty(),
  // is either FE or BE
  body('categories', 'The categories must be an array with length')
    .exists().withMessage('A key of categories must exist')
    .if(body('categories').exists()).isArray().notEmpty(),
  body('categories.*', 'Categories must be an array of strings with length')
    .isString().notEmpty(),
  async (request: Request, response: Response) => {
    if (request.header('apiKey') !== process.env.API_KEY) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized.'
      })
    }
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    try {
      const { question, answer, side, categories } = request.body
      const newCard = await Controller.addCard(question, answer, side, categories)
      response.json(newCard.rows[0])
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send(error.message)
      }
    }
  }
)

router.put("/cards/:id",
  body('answer', 'The answer must be a string with length')
    .exists().withMessage('A key of answer must exist')
    .if(body('answer').exists()).isString().notEmpty(),
  async (request: Request, response: Response) => {
  if (request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({
      status: 'error',
      message: 'Unauthorized.'
    })
  }
  const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
  try {
    const { id } = request.params
    const { answer } = request.body
    const updateCard = await Controller.updateCard(answer, id)
    response.json("The answer was updated!")
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message)
    }
  }
})

router.delete("/cards/:id", async (request: Request, response: Response) => {
  if (request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({
      status: 'error',
      message: 'Unauthorized.'
    })
  }
  try {
    const { id } = request.params
    const deleteCard = await Controller.deleteCard(id)
    response.json("The card has been deleted!")
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message)
    }
  }
})

export default router