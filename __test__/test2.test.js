const axios = require('axios')
require('dotenv').config()

const apiUrl = process.env.DOMAIN

// updateFruitForFruitStorage

beforeAll(async () => {
  const seedQuery = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        description
        limit
        name
      }
    }
  `
  await axios.post(apiUrl, { query: seedQuery })
})

test('updates the description of a lemon fruit successfully', async () => {
  const updateQuery = `
    mutation {
      updateFruitForFruitStorage(name: "lemon", description: "updated lemon description") {
        description
        limit
        name
      }
    }
  `
  const response = await axios.post(apiUrl, { query: updateQuery })

  expect(response.data).toMatchObject({
    data: {
      updateFruitForFruitStorage: {
        description: 'updated lemon description',
        limit: 10,
        name: 'lemon'
      }
    }
  })
})

test('fails to update the description of a lemon fruit with a long description', async () => {
  const createQuery = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        description
        limit
        name
      }
    }
  `
  await axios.post(apiUrl, { query: createQuery })

  const updateQuery = `
    mutation {
      updateFruitForFruitStorage(name: "lemon", description: "updated lemon with a long description") {
        description
        limit
        name
      }
    }
  `
  const response = await axios.post(apiUrl, { query: updateQuery })

  expect(response.data.errors).toBeDefined()
})
