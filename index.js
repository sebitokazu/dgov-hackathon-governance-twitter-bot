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
    const replyTo = tweet.user.screen_name;
    const tweetId = tweet.id_str;
    const hashtags = tweet.entities.hashtags;


    if(hashtags.length != 0){
        switch(hashtags[0].text.toLowerCase()){
            case "protocols":
                if(hashtags.length == 1){
                    var data = BoardroomService.getProtocols();
                    data.then((res)=>{
                        res.data.forEach((protocol)=>{
                            let text = createProtocolTweet(protocol);
                            replyMention(tweetId, replyTo, text);
                        });
                    })
                }else{
                    let protocol = hashtags[1].text.toLowerCase();
                    var data = BoardroomService.getProtocolsByName(protocol);
                    data.then((res)=>{
                        let text = createProtocolTweet(res.data);
                        replyMention(tweetId, replyTo, text);
                    }).catch((reason)=>{
                        replyErrorMention(tweetId, replyTo);
                    });
                }
                break;
            case "proposals":
                break;
            case "voter":
                break;
            case "stats":
                var data = BoardroomService.getStats();
                data.then((stats)=>{
                    let text = `\n Total Proposals: ${stats.data.totalProposals}`+
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

function replyErrorMention(tweetId,replyTo){
    var replyText = `Sorry @${replyTo} , something is wrong with the request or maybe I screwed up... #bot`;
    T.post('statuses/update', {status: replyText, in_reply_to_status_id: tweetId}, (err,reply)=>{
        if(err)
            console.log(err.message);
        else
            console.log('Replied:' + reply.text);
    });
}

function createProtocolTweet(data){
    return `\n Protocol: ${data.name}`+
    `\n Symbol: ${data.tokens[0].symbol}`+
    `\n Network: ${data.tokens[0].network}`+
    `\n Price: ${data.tokens[0].marketPrices[0].price} ${data.tokens[0].marketPrices[0].currency}`+
    `\n #${data.cname} \n`;
}