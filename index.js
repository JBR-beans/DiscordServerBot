// Initialize dotenv
require('dotenv').config();
// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
// Goodmorning to our bot~
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
// Log In our bot
client.login(process.env.CLIENT_TOKEN);

const command1 = "*shakes treat bag*";
const command2 = "where's the kitty?";
const command3 = "food"; // contains

const command4a = "laser";
const command4b = "lazer";

const response1 = "*runs to you* meoooow :3";
const response2 = "*Pukes on the carpet cutely* :3c mrrt"; // thank you seika
const response3 = "*takes a bite when you're not looking*";

const response4a = "*jumps around to catch it* n<(^w^)>n";
const response4b = "*prrt* :3c *catches light*";


let messageOffsetTrigger = 5; // maybe make command that can change this in client on the fly, so kept as let
let messageOffsetIndex = 0; // when this equals the trigger, send a random chat message event


let randomCatStuff = [
	"*curls up and goes eep*",
	"*jumps off shelf onto table*",
	"*sits on keyboard* saaaaaaaaaaaaaadsddddddddddddddddddddddddddddddddddddd",
	"*knocks phone off table*",
	"*knocks potted plant off table*",
	"*knocks pencil off table*",
	"*knocks piece of paper off table*"
];

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

client.on('messageCreate', msg => {

	// You can view the msg object here with console.log(msg)
	if (msg.author.username != 'Server Cat') {

		let _channelid = msg.channelId;
		let _messagecontent = msg.content;
		let _lowercasemessage = _messagecontent.toLowerCase();

		if (messageOffsetIndex >= messageOffsetTrigger) {


			messageOffsetIndex = 0;

			console.log("reset messageOffsetIndex ", messageOffsetIndex);

			client.channels.cache.get(_channelid).send(randomCatStuff[getRandomInt(randomCatStuff.length)]);

		}

		messageOffsetIndex++;
		console.log("set messageOffsetIndex ", messageOffsetIndex);
		console.log("ready for next message");
		console.log();

		
		
		
		if (_lowercasemessage.includes(command1)) {
			client.channels.cache.get(_channelid).send(response1);
			console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response1);
		}

		if (_lowercasemessage.includes(command2)){
			client.channels.cache.get(_channelid).send(response2);
			console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response2);
		}

		if (_lowercasemessage.includes(command3)){
			client.channels.cache.get(_channelid).send(response3);
			console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response3);
		}

		if (_lowercasemessage.includes(command4a) || _lowercasemessage.includes(command4b)){
			client.channels.cache.get(_channelid).send(response4a);
			client.channels.cache.get(_channelid).send(response4b);
			console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response4a);
			console.log(client.channels.cache.get(_channelid)+' | '+"Server Cat"+': '+response4b);
		}

		// logging
		console.log(client.channels.cache.get(_channelid)+' | '+msg.author.globalName+': '+_messagecontent);


	}
});