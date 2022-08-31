const { WebhookClient, Embed } = require('guilded.js');
require('dotenv').config();
fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
	method: 'POST'
}).then(res => res.json()).then(res => {
	let access_token = res.access_token;
	let expires_in = res.expires_in;
	// let token_type = res.token_type;
	fetch(`https://api.twitch.tv/helix/users?login=${process.env.BROADCASTER_LOGIN}`, {
		headers: {
			'Client-ID': process.env.TWITCH_CLIENT_ID,
			'Authorization': `Bearer ${access_token}`
		}
	}).then(res => res.json()).then(res => {
		let userId = res.data[0].id;
		let displayName = res.data[0].display_name;
		let date = new Date();
		date.setDate(date.getDate() - 1);
		fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=100&started_at=${date.toISOString()}`, {
		//fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=100`, {
			headers: {
				'Client-ID': process.env.TWITCH_CLIENT_ID,
				'Authorization': `Bearer ${access_token}`
			}
		}).then(res => res.json()).then(async res => {
			/*res:
			{
				"data": [
					{
						"id": "slug",
						"url": "https://clips.twitch.tv...",
						"embed_url": "https://clips.twitch.tv/embed?...",
						"broadcaster_id": "363",
						"broadcaser_name": "wtwdsdg",
						"creator_id": "5235",
						"creator_name": "Clipcreator",
						"video_id": "",
						"game_id", "54354",
						"language": "de",
						"title": "Cliptitle",
						"view_count": "53"
						"created_at": "ISO-String",
						"thumbnail_url": "https://clips-media-assets2.twitch.tv/...",
						"duration": 30
					}
				]
			}
			*/
			let webhookClient = new WebhookClient(process.env.GUILDED_WEBHOOK_URL);
			let color = '#9146FF';
			for (let i = 0; i < res.data.length; i++) {
				let profileImageUrl = (await fetch(`https://api.twitch.tv/helix/users?id=${res.data[i].creator_id}`, {
					headers: {
						'Client-ID': process.env.TWITCH_CLIENT_ID,
						'Authorization': `Bearer ${access_token}`
					}
				}).then(res => res.json()).catch(err => console.error(err))).data[0].profile_image_url;
				webhookClient.send('', [
					new Embed()
					.setColor(color)
					.setTitle(res.data[i].title.trim())
					.setURL(res.data[i].url)
					.setAuthor(res.data[i].name, profileImageUrl, `https://www.twitch.tv/${res.data[i].creator_name.trim().toLowerCase()}`)
					.setImage(res.data[i].thumbnail_url)
					.addField(`[Streamer](https://www.twitch.tv/${res.data[i].broadcaster_name.toLowerCase()})`, `[${res.data[i].broadcaster_name}](https://www.twitch.tv/${res.data[i].broadcaster_name.toLowerCase()})`, true)
					.addField(`[Clipper](https://www.twitch.tv/${res.data[i].creator_name.toLowerCase()})`, `[${res.data[i].creator_name}](https://www.twitch.tv/${res.data[i].creator_name.toLowerCase()})`, true)
					.addField(`[Views](${res.data[i].url})`, `[${res.data[i].view_count}](${res.data[i].url})`, true)
					.addField(`[Duration](${res.data[i].url})`, `[${res.data[i].duration} Seconds](${res.data[i].url})`, true)
				]).catch(err => console.error(err));
			}
		}).catch(err => console.error(err));
	}).catch(err => console.error(err));
}).catch(err => console.error(err));
