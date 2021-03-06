
const targetChatIds = process.env.TARGET_CHAT_IDS.split(',')
const repostIds = process.env.REPOST_IDS.split(',')

const bot = require('../getBot.js')

module.exports = (req, res, next) => {
  let channel_id 
  if (req.body.channel_post) {
    channel_id = String(req.body.channel_post.chat.id)
  }
  console.log(req.body.channel_post)
  console.log(channel_id)
  console.log(req.body.channel_post && repostIds.includes(channel_id))
  if (req.body.channel_post && repostIds.includes(channel_id)){
    // console.log(req.body)
    const message_id = req.body.channel_post.message_id
    targetChatIds.forEach(chat_id => {
      // Forward all messages sent to channel where bot is admin to all TARGET_CHAT_IDS
      try {
        bot.forwardMessage(chat_id, channel_id, message_id)
      }
      catch (err) {
        console.log("TELEGRAM ERROR:")
        console.log(err)
      } 
    }) 
  }
  next()
}
