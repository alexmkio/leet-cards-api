const compression = require('compression')
const helmet = require("helmet");
var cors = require('cors')
const rateLimit = require('express-rate-limit')
const router = require('./router');

const useSpy = jest.fn()
const listenSpy = jest.fn()

jest.doMock('express', () => {
  return () => ({
    use: useSpy,
    listen: listenSpy,
  })
})

describe('test Server', () => {

  test.skip('Expect app to use compression', () => {
    require('./server.ts')
    expect(useSpy).toHaveBeenCalledTimes(5)
  })

  test.skip('Expect app to use compression', () => {
    require('./server.ts')
    expect(useSpy).toHaveBeenNthCalledWith(1, compression)
    // expect(useSpy).toHaveBeenCalledWith(compression)
    // expect(useSpy).toHaveBeenCalledWith(helmet)
    // expect(useSpy).toHaveBeenCalledWith(cors)
    // expect(useSpy).toHaveBeenCalledWith(rateLimit)
    // expect(useSpy).toHaveBeenCalledWith(router)
  })

  test.skip('use router', () => {
    require('./server.ts')
    expect(useSpy).toHaveBeenCalledTimes(5)
    // expect(useSpy).toHaveBeenNthCalledWith(1, compression, helmet, cors, rateLimit, router)
    // expect(useSpy).toHaveBeenNthCalledWith(2, helmet)
    // expect(useSpy).toHaveBeenNthCalledWith(3, cors)
    // expect(useSpy).toHaveBeenNthCalledWith(4, rateLimit)
    // expect(useSpy).toHaveBeenNthCalledWith(5, router)
  })

  test.skip('Expect app to use compression', () => {
    require('./server.ts')
    expect(useSpy).toHaveBeenLastCalledWith(router)
  })

  // test.skip('should call listen fn', () => {
  //   require('./server.ts')
  //   expect(listenSpy).toHaveBeenCalled()
  // })
})