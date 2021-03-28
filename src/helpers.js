const images = require("./utils/images.json")


module.exports = function () {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomImage(images) {
    const index = randomNumber(1, 6)
    return images[index - 1]
  }

  const groups = Object.keys(images)
  const sendImages = []
  groups.forEach((group, index) => {
    sendImages.push(randomImage(images[group]))
  })
  return sendImages
}
