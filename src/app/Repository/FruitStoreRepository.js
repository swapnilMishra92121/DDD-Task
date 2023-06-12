const findFruitByName = (name, subFruitsDB) => {
  return subFruitsDB.findOne({ name })
}

const updateFruitByName = (name, subfruit, subFruitsDB, amount) => {
  return subFruitsDB.findOneAndUpdate(
    { name },
    { name, amount: subfruit.amount - amount },
    { new: true }
  )
}

const removeFruitByName = (name, subFruitsDB) => {
  return subFruitsDB.findOneAndRemove({ name })
}

const createFruit = (name, amount, subFruitsDB) => {
  return subFruitsDB.create({ name, amount })
}

module.exports = {
  findFruitByName,
  updateFruitByName,
  removeFruitByName,
  createFruit
}
