import axios from "axios"
import FormData from "form-data"

export default function () {

  async function upload(base64) {
    const data = new FormData()
    data.append('image', base64)

    const config = {
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: {
        'Authorization': `Client-ID ${process.env.CLIENT_ID}`,
        'Token': `${process.env.ACCESS_TOKEN}`,
        ...data.getHeaders()
      },
      data: data
    }

    const response = await axios(config)
    return response.data.data.link
  }
  return {
    upload,
  }
}