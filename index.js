import BoardroomService from './boardroomService'

require('dotenv').config()

const Twit = require('twit');
const axios = require('axios').default;
axios.defaults.baseURL = process.env.BOARDROOM_API_URL

console.log('Initializing bot...')

const T = new Twit({
    consumer_key: process.env.TWIT_CONSUMER_KEY,
    consumer_secret: process.env.TWIT_CONSUMER_SECRET,
    access_token: process.env.TWIT_ACCESS_TOKEN,
    access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
})

