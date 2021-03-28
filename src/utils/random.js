export default function () {
  function number(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function element(array) {
    const max = array.length
    const index = number(1, max)
    return array[index - 1]
  }

  return {
    number,
    element,
  }
}
