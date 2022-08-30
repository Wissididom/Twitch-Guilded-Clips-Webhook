const { WebhookClient, Embed } = require('guilded.js');
require('dotenv').config();
let color = '#9146FF';
let title = 'Cliptitle';
let clipurl = 'https://www.twitch.tv';
let author = {
	name: 'Wissididom',
	avatarURL: 'https://img.guildedcdn.com/asset/DefaultUserAvatars/profile_5.png',
	url: 'https://www.twitch.tv/wissididom'
}
let image = 'https://i.ytimg.com/vi/c0hv8h2a4Tk/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAo8ctCHMzDpxvXuZIbe6jd-j0Hxg';
let streamer = {
	name: 'Wissididom',
	url: 'https://twitch.tv/wissididom'
}
let clipper = {
	name: 'WissididomBot',
	url: 'https://twitch.tv/wissididombot'
}
let views = 69;
let webhookClient = new WebhookClient(process.env.GUILDED_WEBHOOK_URL);
webhookClient.send('', [
	new Embed().setColor(color).setTitle(title).setURL(clipurl).setAuthor(author.name, author.avatarURL, author.url).setImage(image).addField(`[Streamer](${streamer.url})`, `[${streamer.name}](${streamer.url})`, true).addField(`[Clipper](${clipper.url})`, `[${clipper.name}](${clipper.url})`, true).addField(`[Views](${clipurl})`, `[${views}](${clipurl})`, true)
]).catch(err => console.error(err));
