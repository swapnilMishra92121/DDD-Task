const axios = require('axios')
require('dotenv').config()

const apiUrl = process.env.DOMAIN

// removeFruitFromFruitStorage

beforeAll(async () => {
  const seedQuery = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        description
        limit
        name
      }
      storeFruitToFruitStorage(name: "lemon", amount: 5) {
        name
        amount
      }
    }
  `
  await axios.post(apiUrl, { query: seedQuery })
})

test('removes 5 lemons from fruit storage successfully', async () => {
  const removeQuery = `
    mutation {
      removeFruitFromFruitStorage(name: "lemon", amount: 5) {
        name
        amount
      }
    }
  `
  const response = await axios.post(apiUrl, { query: removeQuery })

  expect(response.data).toMatchObject({
    data: {
      removeFruitFromFruitStorage: {
        name: 'lemon',
        amount: 0
      }
    }
  })
})

test('fails to remove 6 lemons from fruit storage', async () => {
  const removeQuery = `
    mutation {
      removeFruitFromFruitStorage(name: "lemon", amount: 6) {
        name
        amount
      }
    }
  `
  const response = await axios.post(apiUrl, { query: removeQuery })

  expect(response.data.errors).toBeDefined()
})
