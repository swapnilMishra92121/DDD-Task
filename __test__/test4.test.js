const axios = require('axios')
require('dotenv').config()

const apiUrl = process.env.DOMAIN

// storeFruitToFruitStorage

beforeAll(async () => {
  const seedQuery = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        limit
        name
      }
    }
  `
  await axios.post(apiUrl, { query: seedQuery })
})

test('stores 5 lemons to fruit storage successfully', async () => {
  const storeQuery = `
    mutation {
      storeFruitToFruitStorage(name: "lemon", amount: 5) {
        name
        amount
      }
    }
  `
  const response = await axios.post(apiUrl, { query: storeQuery })

  if (response.data.errors) {
    expect(response.data.errors).toBeDefined()
    return
  }

  expect(response.data).toMatchObject({
    data: {
      storeFruitToFruitStorage: {
        name: 'lemon',
        amount: 5
      }
    }
  })
})

test('fails to store 11 lemons to fruit storage', async () => {
  const storeQuery = `
    mutation {
      storeFruitToFruitStorage(name: "lemon", amount: 11) {
        name
        amount
      }
    }
  `
  const response = await axios.post(apiUrl, { query: storeQuery })

  expect(response.data.errors).toBeDefined()
})
