import Discord from "discord.js"
export default function () {
  const client = new Discord.Client()
  client.on('ready', () => {
    console.info(`Connected! ${client.user.tag}`)
  })

  client.login(process.env.BOT_TOKEN)
  return client
}
