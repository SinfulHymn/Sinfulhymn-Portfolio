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

// Keep track of recent notifications and visit counts
const visitorStats = new Map()
const NOTIFICATION_TIMEOUT = 5000 // 5 seconds

// Function to parse user agent for detailed device info
function parseUserAgent(userAgent) {
  const ua = userAgent.toLowerCase()
  const browser = ua.includes('firefox')
    ? 'Firefox'
    : ua.includes('chrome')
    ? 'Chrome'
    : ua.includes('safari')
    ? 'Safari'
    : ua.includes('edge')
    ? 'Edge'
    : ua.includes('opera')
    ? 'Opera'
    : 'Unknown'

  const os = ua.includes('windows')
    ? 'Windows'
    : ua.includes('mac')
    ? 'macOS'
    : ua.includes('linux')
    ? 'Linux'
    : ua.includes('android')
    ? 'Android'
    : ua.includes('ios')
    ? 'iOS'
    : 'Unknown'

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(ua)

  return { browser, os, isMobile }
}

// Function to check if IP is a VPN/Proxy
async function checkVPN(ip) {
  try {
    const response = await axios.get(
      `${IP_API_URL}/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting`
    )
    const data = response.data

    return {
      isVPN: data.proxy || data.hosting,
      isp: data.isp,
      organization: data.org,
      as: data.as,
    }
  } catch (error) {
    console.error('Error checking VPN status:', error)
    return { isVPN: false, isp: 'Unknown', organization: 'Unknown', as: 'Unknown' }
  }
}

// Function to generate appropriate header based on visit count
function generateHeader(visitCount) {
  if (visitCount === 1) {
    return '🌐 New Website Visitor!'
  } else if (visitCount <= 3) {
    return '👋 Returning Visitor'
  } else if (visitCount <= 10) {
    return '🔄 Frequent Visitor'
  } else {
    return '⭐ Loyal Visitor'
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Get visitor's IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    // Get device information
    const userAgent = req.headers['user-agent']
    const deviceInfo = parseUserAgent(userAgent)

    // Get referrer
    const referrer = req.headers.referer || 'Direct'

    // Get language
    const language = req.headers['accept-language']?.split(',')[0] || 'Unknown'

    // Update visitor stats
    const currentStats = visitorStats.get(ip) || { count: 0, firstSeen: Date.now() }
    currentStats.count++
    currentStats.lastSeen = Date.now()
    visitorStats.set(ip, currentStats)

    // Get geolocation data
    const geoResponse = await axios.get(`${IP_API_URL}/${ip}`)
    const geoData = geoResponse.data

    // Check VPN status
    const vpnInfo = await checkVPN(ip)

    // Calculate time since first visit
    const timeSinceFirstVisit = Math.floor((Date.now() - currentStats.firstSeen) / 1000) // in seconds

    // Prepare message for Telegram
    const message = `
${generateHeader(currentStats.count)}
📍 Location: ${geoData.city || 'Unknown'}, ${geoData.country || 'Unknown'}
🌍 IP: ${ip}
📊 Visit Count: ${currentStats.count}
⏱️ First Visit: ${new Date(currentStats.firstSeen).toLocaleString()}
⏰ Current Time: ${new Date().toLocaleString()}
💻 Device Info:
  • Browser: ${deviceInfo.browser}
  • OS: ${deviceInfo.os}
  • Device: ${deviceInfo.isMobile ? 'Mobile' : 'Desktop'}
🌐 Referrer: ${referrer}
🗣️ Language: ${language}
🔒 Connection Info:
  • VPN/Proxy: ${vpnInfo.isVPN ? 'Yes' : 'No'}
  • ISP: ${vpnInfo.isp}
  • Organization: ${vpnInfo.organization}
  • AS: ${vpnInfo.as}
    `

    // Send notification to Telegram using the bot instance
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })

    // Set timeout to clean up old visitor stats (after 24 hours)
    setTimeout(() => {
      visitorStats.delete(ip)
    }, 24 * 60 * 60 * 1000)

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
