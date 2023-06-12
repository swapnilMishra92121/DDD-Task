const axios = require('axios')
require('dotenv').config()

const apiUrl = process.env.DOMAIN

// createFruitForFruitStorage

test('creates a lemon fruit successfully', async () => {
  const query = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        description
        limit
        name
      }
    }
  `
  const response = await axios.post(apiUrl, { query })

  if (response.data.errors) {
    expect(response.data.errors).toBeDefined()
    return
  }

  expect(response.data).toMatchObject({
    data: {
      createFruitForFruitStorage: {
        description: 'this is a lemon',
        limit: 10,
        name: 'lemon'
      }
    }
  })
})

test('fails to create a lemon fruit with a long description', async () => {
  const query = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a fruit with a very long description", limit: 10) {
        description
        limit
        name
      }
    }
  `
  const response = await axios.post(apiUrl, { query })

  expect(response.data.errors).toBeDefined()
})

test('fails to create duplicate lemons', async () => {
  const query = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        description
        limit
        name
      }
    }
  `

  try {
    await axios.post(apiUrl, { query })
    await axios.post(apiUrl, { query })
  } catch (error) {
    expect(error.response.data.errors).toBeDefined()
  }
})
