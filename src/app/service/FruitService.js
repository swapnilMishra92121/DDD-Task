const createFruitValidation = (description, limit) => {
  if (description.length > 30) {
    throw new Error('Description must be 30 characters or less.')
  }
  if (limit <= 0) {
    throw new Error('limit not be Zero')
  }
}

const deleteFruitValidation = (name, fruit, forceDelete) => {
  if (!fruit) {
    throw new Error(`${name} is not present.`)
  }
  if (fruit?.limit > 0 && !forceDelete) {
    throw new Error(
      `Cannot delete ${name}. Fruit still has remaining quantity.`
    )
  }
}

const updateFruitValidation = (description, limit) => {
  if (description.length > 30) {
    throw new Error('Description must be 30 characters or less.')
  }
  if (limit <= 0) {
    throw new Error('limit not be Zero')
  }
}

module.exports = {
  createFruitValidation,
  deleteFruitValidation,
  updateFruitValidation
}
