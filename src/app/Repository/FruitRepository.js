const createFruit = (name, description, limit, fruitsDB) => {
  return fruitsDB.create({ name, description, limit })
}

const findFruitByName = (name, fruitsDB) => {
  return fruitsDB.findOne({ name })
}

const removeFruitByName = (name, fruitsDB) => {
  return fruitsDB.findOneAndRemove({ name })
}

const updateFruitByName = (name, description, limit, fruitsDB) => {
  return fruitsDB.findOneAndUpdate(
    { name },
    { name, description, limit },
    { new: true }
  )
}

module.exports = {
  createFruit,
  findFruitByName,
  removeFruitByName,
  updateFruitByName
}
