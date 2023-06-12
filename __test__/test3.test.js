const axios = require('axios')
require('dotenv').config()

const apiUrl = process.env.DOMAIN

// deleteFruitFromFruitStorage

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

test('fails to delete the lemon fruit from fruit storage without force delete', async () => {
  const deleteQuery = `
    mutation {
      deleteFruitFromFruitStorage(name: "lemon") {
        name
      }
    }
  `
  const response = await axios.post(apiUrl, { query: deleteQuery })

  expect(response.data.errors).toBeDefined()
})

test('deletes the lemon fruit from fruit storage with force delete', async () => {
  const deleteQuery = `
    mutation {
      deleteFruitFromFruitStorage(name: "lemon", forceDelete: true) {
        name
      }
    }
  `
  const response = await axios.post(apiUrl, { query: deleteQuery })

  expect(response.data).toMatchObject({
    data: {
      deleteFruitFromFruitStorage: {
        name: 'lemon'
      }
    }
  })
})
