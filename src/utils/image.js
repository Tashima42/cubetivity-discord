import imageToBase64 from "image-to-base64"
import randomHelper from "./random.js"
const random = randomHelper()
import createCollage from "nf-photo-collage"
import fs from "fs"
import path from "path"
const __dirname = path.resolve(path.dirname(''));
const baseDir = __dirname + "/src/utils/images"
const writeDir = __dirname + "/src/utils/collages"

export default function () {
  function selectRandomImages() {
    const generate = []

    const categories = fs.readdirSync(baseDir)
    categories.forEach(dir => {
      const images = fs.readdirSync(`${baseDir}/${dir}`)
      const randomImage = random.element(images)
      generate.push(`${baseDir}/${dir}/${randomImage}`)
    })
    return generate
  }

  function mergeImages(fileName) {
    return new Promise((resolve, reject) => {
      const writeFile = `${writeDir}/${fileName}.png`
      const images = selectRandomImages()
      const options = {
        sources: images,
        width: 3,
        height: 2,
        imageWidth: 410,
        imageHeight: 410,
        backgroundColor: "#000000",
        spacing: 5,
      }

      createCollage(options).then(canvas => {
        const src = canvas.jpegStream();
        const dest = fs.createWriteStream(writeFile);
        src.pipe(dest)
        resolve(writeFile)
      }).catch(error => reject(error))
    })
  }

  function base64(path) {
    return new Promise((resolve, reject) => {
      imageToBase64(path)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  }

  return {
    base64,
    mergeImages,
  }
}
