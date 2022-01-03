const request = require('supertest')
const server = require('../src/server')

describe("Testing Leet Card\'s App", () => {

	it.only("The default route should return message pointing to project documentation", async () => {
		const response = await request(server).get('/').set({
      method: 'GET',
      'apiKey': process.env.API_KEY
    })
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('API Documentation: https://github.com/alexmkio/leet-cards-api')
	})

  // it.only("Getting cards should return an array of cards", async () => {
	// 	const response = await request(server).get('/cards').set({
  //     method: 'GET',
  //     'apiKey': process.env.API_KEY
  //   })
	// 	expect(response.status).toBe(200)
  //   console.log('666', response.body)
  //   expect(response.body)
	// 	})

})

// describe("Testing the Leet Cards API - Sad Paths", () => {

// 	it("The default route needs a header with an API key", async () => {
// 		const response = await request(server).get('/')
// 		expect(response.status).toBe(401)
//     expect(response.body.status).toBe('error')
// 		expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toBe('Unauthorized.')
// 	})

//   it("To get all cards you need a header with an API key", async () => {
// 		const response = await request(server).get('/cards')
// 		expect(response.status).toBe(401)
//     expect(response.body.status).toBe('error')
// 		expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toBe('Unauthorized.')
// 	})

//   it("To get a card you need a header with an API key", async () => {
// 		const response = await request(server).get('/cards/1')
// 		expect(response.status).toBe(401)
//     expect(response.body.status).toBe('error')
// 		expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toBe('Unauthorized.')
// 	})

//   it("To post a new card you need a header with an API key", async () => {
// 		const response = await request(server).post('/cards')
// 		expect(response.status).toBe(401)
//     expect(response.body.status).toBe('error')
// 		expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toBe('Unauthorized.')
// 	})

//   it("To update a card you need a header with an API key", async () => {
// 		const response = await request(server).put('/cards/1')
// 		expect(response.status).toBe(401)
//     expect(response.body.status).toBe('error')
// 		expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toBe('Unauthorized.')
// 	})

//   it("To delete a card you need a header with an API key", async () => {
// 		const response = await request(server).delete('/cards/1')
// 		expect(response.status).toBe(401)
//     expect(response.body.status).toBe('error')
// 		expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toBe('Unauthorized.')
// 	})

// })