const Service = require('./service');

const Controller = {
  getCards: async () => {
    const allCards = await Service.query("SELECT * FROM cards")
    return allCards
  },
  
  getCard: async (id: number) => {
    const card = await Service.query("SELECT * FROM cards WHERE id = $1",
      [id]
    )
    return card
  },
  
  addCard: async (
      question: string,
      answer: string,
      side: string,
      categories: string
    ) => {
    const allCards = await Service.query(
      "INSERT INTO cards (question, answer, side, categories) VALUES($1, $2, $3, $4) RETURNING *",
      [question, answer, side, categories]
    )
    return allCards
  },
  
  updateCard: async (answer: string, id: number) => {
    const update = await Service.query(
      "UPDATE cards SET answer = $1 WHERE id = $2",
      [answer, id]
    )
    return update
  },
  
  deleteCard: async (id: number) => {
    const deleted = await Service.query("DELETE FROM cards WHERE id = $1", [
      id
    ])
    return deleted
  }
}

module.exports = Controller;