const Controller = require('./controller')

const getSpy = jest.fn()
const postSpy = jest.fn()
const putSpy = jest.fn()
const deleteSpy = jest.fn()

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        put: putSpy,
        delete: deleteSpy
      }
    }
  }
})

describe('should test router', () => {
  require('./router.ts')

  test.skip('should test get POSTS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(1, '/', Controller.getPosts)
  })

  test('should test get POST', () => {
    expect(getSpy).toHaveBeenNthCalledWith(2, '/cards', Controller.getCards)
  })

  test('should test get POSTS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(3, '/cards/:id', Controller.getCard)
  })

  test('should test get POSTS', () => {
    expect(postSpy).toHaveBeenNthCalledWith(1, '/cards', Controller.addCard)
  })

  test('should test get POSTS', () => {
    expect(putSpy).toHaveBeenNthCalledWith(1, '/cards/:id', Controller.updateCard)
  })

  test('should test get POSTS', () => {
    expect(deleteSpy).toHaveBeenNthCalledWith(1, '/cards/:id', Controller.deleteCard)
  })

})