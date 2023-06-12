const axios = require('axios')
require('dotenv').config()

const apiUrl = process.env.DOMAIN

// findFruit

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

test('finds the lemon fruit successfully', async () => {
  const findQuery = `
    query {
      findFruit(name: "lemon") {
        name
        limit
      }
    }
  `
  const response = await axios.post(apiUrl, { query: findQuery })

  expect(response.data).toMatchObject({
    data: {
      findFruit: [
        {
          name: 'lemon',
          limit: 10
        }
      ]
    }
  })
})

test('fails to find a non-existing fruit', async () => {
  const findQuery = `
    query {
      findFruit(name: "not a lemon") {
        name
        limit
      }
    }
  `
  const response = await axios.post(apiUrl, { query: findQuery })

  expect(response.data.errors).toBeDefined()
})
