require('dotenv').config()

const BoardroomServiceClass = require('./boardroomService');
const BoardroomService = new BoardroomServiceClass()
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

var listenForMentions = T.stream('statuses/filter', {track: `@${process.env.BOT_USER}`});
listenForMentions.on('tweet', mention);

function mention(tweet){
    const replyTo = tweet.in_reply_to_screen_name;
    const tweetId = tweet.id_str;
    const hashtags = tweet.entities.hashtags;

    if(hashtags.length != 0){
        switch(hashtags[0].text){
            case "protocols":
                break;
            case "proposals":
                break;
            case "voter":
                break;
            case "stats":
                var data = BoardroomService.getStats();
                data.then((stats)=>{
                    var text = `\n Total Proposals: ${stats.data.totalProposals}`+
                    `\n Total Protocols: ${stats.data.totalProtocols}`+
                    `\n Total Unique Voters: ${stats.data.totalUniqueVoters}`+
                    `\n Total Votes Cast: ${stats.data.totalVotesCast} \n`
                    replyMention(tweetId, replyTo,text);
                })
                break;
        }
    }
    
}

function replyMention(tweetId,replyTo, text){
    var replyText = `Thanks for asking @${replyTo}` + text + " #bot";
    T.post('statuses/update', {status: replyText, in_reply_to_status_id: tweetId}, (err,reply)=>{
        if(err)
            console.log(err.message);
        else
            console.log('Replied:' + reply.text);
    });
}
