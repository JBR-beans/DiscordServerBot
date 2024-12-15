// Initialize dotenv
require('dotenv').config();
const { Console } = require('console');
const fs = require('fs');
const request = require(`request`);
// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, GatewayIntentBits, Attachment, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Goodmorning to our bot~
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
// Log In our bot
client.login(process.env.CLIENT_TOKEN);

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
});

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
});

const command1 = "*shakes treat bag*";
const command2 = "where's the kitty?";
const command3 = "food"; // contains

const command4a = "laser";
const command4b = "lazer";

const response1 = "*runs to you* meoooow :3";
const response2 = "*Pukes on the carpet cutely* :3c mrrt"; // thank you seika
const response3 = "*takes a bite when you're not looking*";

const response4 = "*jumps around to catch it* n<(^w^)>n" + '\n' + "*prrt* :3c *catches light*";
const response4a = "*jumps around to catch it* n<(^w^)>n";
const response4b = "*prrt* :3c *catches light*";


let messageOffsetTrigger = 5; // maybe make command that can change this in client on the fly, so kept as let
let messageOffsetTick = 0; // when this equals the trigger, send a random chat message event


let randomCatStuff = [
	"*curls up and goes eep*",
	"*jumps off shelf onto table*",
	"*sits on keyboard* afdeswcewsafddddddddddddddddddddddddddddddddddddd",
	"*knocks phone off table*",
	"*knocks potted plant off table*",
	"*knocks pencil off table*",
	"*knocks piece of paper off table*",
	":3"
];



client.on('messageCreate', async msg => {

	// You can view the msg object here with console.log(msg)
	if (msg.author.username != 'Server Cat') {
		
		// message content processing
		let _channelid = msg.channelId;

		if ( _channelid == "1282279204259627102" || _channelid == "1191181380604923954") {
			let _messagecontent = msg.content;
			let _lowercasemessage = _messagecontent.toLowerCase();
		
		// random cat commands and such
		if (messageOffsetTick >= messageOffsetTrigger) {

			messageOffsetTick = 0;

			console.log("reset messageOffsetIndex ", messageOffsetTick);

			client.channels.cache.get(_channelid).send(randomCatStuff[RandomInt(randomCatStuff.length)]);

		}

		messageOffsetTick++;

		GetAttachment(msg);

		let response = ServerCatMessageResponse(msg);
		
		if (response == undefined) {
			response = "no response";
		}
		
		if (response != undefined) {
			client.channels.cache.get(_channelid).send(response);
			console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response);
		}
		
		console.log("set messageOffsetIndex ", messageOffsetTick);
		console.log("ready for next message");
		console.log();
		
		// images
		

		// logging
		console.log(client.channels.cache.get(_channelid)+' | '+msg.author.globalName+': '+_messagecontent);
	}
	}
});

// utility
function RandomInt(max) {
	return Math.floor(Math.random() * max);
}

function ServerCatMessageResponse(msg) {

	var response;

	let _lowercasemessage = msg.content.toLowerCase();

	if (_lowercasemessage.includes(command1)) {
		response = response1;
		//client.channels.cache.get(_channelid).send(response1);
		//console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response1);
	}

	if (_lowercasemessage.includes(command2)){
		respone = response2;
		//client.channels.cache.get(_channelid).send(response2);
		//console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response2);
	}

	if (_lowercasemessage.includes(command3)){
		response = response3;
		//client.channels.cache.get(_channelid).send(response3);
		//console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response3);
	}

	if (_lowercasemessage.includes(command4a) || _lowercasemessage.includes(command4b)){
		response = response4;
		//client.channels.cache.get(_channelid).send(response4);
		//console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response4);
	}

	return response;
}
// converting image to ascii
function GetAttachment(msg){
	
	let url;
	let file;
	let _index = 0;

	if (msg.attachments != undefined) {
		let message_attach = msg.attachments.forEach( attachment => {

			// process the attachment at this position in the array
			_index++;
	
			if (_index === 1 ) {
				url = attachment.url;
				file = attachment.name;
			msg.channel.send({
				content: url
				});
	
				// logging
			console.log( url );
			}
		});
	
		_index = 0;
		
		// download
		if (url != undefined) {
			console.log("File detected")
			download(url,file);
		}
	}
	
	
}
function ProcessImage(msg_attachment) {
	console.log("file detected");

	download(msg_attachment.url);
	console.log(" File checked");
        if(msg_attachment.filename === `png`){
            
        
    }
	download()
	  console.log("File process attempted");

	}

	function download(url,file){
		request.get(url)
			.on('error', console.error)
			.pipe(fs.createWriteStream(`./${file.name}`));
			console.log("File downloaded");
	}
