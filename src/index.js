/*  RESOURCES:
    https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js
*/
'use strict'
require("dotenv").config()

const Discord = require("discord.js")
const client = new Discord.Client()

const selectImages = require("./helpers")

const prefix = "]"
client.on('message', (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(prefix)) return

  const commandBody = msg.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()

  if (command == "roll") {
    const sendImages = selectImages()
    sendImages.forEach((image) => {
      msg.reply(image)
    })
  }
})

client.login(process.env.BOT_TOKEN)
