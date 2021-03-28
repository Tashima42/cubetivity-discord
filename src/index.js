'use strict'
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()
import discord from "./utils/discord.js"
const client = discord()
import images from "./utils/image.js"
const imageHelper = images()
import express from 'express'
import imgur from "./utils/imgur.js"
const imgurHelper = imgur()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(":)")
})

app.listen(port, () => { })

async function image(fileName) {
  return new Promise(async (resolve, reject) => {
    const path = await imageHelper.mergeImages(fileName)
    setTimeout(async () => {
      const file = await imageHelper.base64(path)
      const url = await imgurHelper.upload(file)
      //const url = "oi"
      resolve({
        url,
        filePath: path
      })
    }, 500)
  })
}

const prefix = "!"
client.on('message', async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(prefix)) return

  const commandBody = msg.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()

  if (command == "roll") {
    const messageId = msg.url.split('/')[6]
    const { url, filePath } = await image(messageId)
    console.log(url)
    await msg.reply(url)
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
})
