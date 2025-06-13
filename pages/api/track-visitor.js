import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api'

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// IP Geolocation API configuration
const IP_API_URL = 'http://ip-api.com/json'

// Initialize Telegram bot with debug logging disabled
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
  polling: false,
  filepath: false,
  debug: false,
})

// Keep track of recent notifications to prevent duplicates
const recentNotifications = new Set()
const NOTIFICATION_TIMEOUT = 5000 // 5 seconds

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Get visitor's IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    // Create a unique key for this notification
    const notificationKey = `${ip}-${Date.now()}`

    // Check if we've sent a notification for this IP recently
    if (recentNotifications.has(ip)) {
      return res.status(200).json({ success: true, message: 'Duplicate notification prevented' })
    }

    // Get device information
    const userAgent = req.headers['user-agent']

    // Get geolocation data
    const geoResponse = await axios.get(`${IP_API_URL}/${ip}`)
    const geoData = geoResponse.data

    // Prepare message for Telegram
    const message = `
🌐 New Website Visitor!
📍 Location: ${geoData.city || 'Unknown'}, ${geoData.country || 'Unknown'}
🌍 IP: ${ip}
💻 Device: ${userAgent}
⏰ Time: ${new Date().toLocaleString()}
    `

    // Send notification to Telegram using the bot instance
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })

    // Add to recent notifications and set timeout to remove it
    recentNotifications.add(ip)
    setTimeout(() => {
      recentNotifications.delete(ip)
    }, NOTIFICATION_TIMEOUT)

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error tracking visitor:', error)

    // More detailed error response
    const errorMessage = error.response?.data?.description || error.message
    res.status(500).json({
      error: 'Failed to track visitor',
      details: errorMessage,
    })
  }
}
