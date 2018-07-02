const commando = require('discord.js-commando');
const path = require('path');
//const sqlite = require('sqlite');
const ms = require('ms');
const fs = require('fs');
const config = require('../config.json');

const client = new commando.Client({
    owner: ['197891949913571329', '251383432331001856', '339230927345418240', '250432205145243649'],
    commandPrefix: 'st.',
    unknownCommandResponse: false
});

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

client.numbers = new Enmap({
    provider: new EnmapLevel({
        name: 'numbers',
    })
});

require('./logging.js')(client);
require('./calls.js')(client);

// client.setProvider(
//     sqlite.open(path.join(__dirname, '../data/settings.sqlite3')).then(db => new commando.SQLiteProvider(db))
// ).catch(console.error);

/*
client.dispatcher.addInhibitor(msg => {
	//eslint-disable-next-line no-sync
	let blacklist = JSON.parse(fs.readFileSync('../blacklist.json', 'utf8'));
	if (blacklist.guilds.includes(msg.guild.id)) return [`Guild ${msg.guild.id} is blacklisted`, msg.channel.send('This guild has been blacklisted. Appeal here: https://discord.gg/6P6MNAU')];
});

client.dispatcher.addInhibitor(msg => {
	//eslint-disable-next-line no-sync
	let blacklist = JSON.parse(fs.readFileSync('../blacklist.json', 'utf8'));
	if (blacklist.users.includes(msg.author.id)) return [`User ${msg.author.id} is blacklisted`, msg.reply('You have been blacklisted. Appeal here: https://discord.gg/6P6MNAU')];
});
*/

client.registry
    .registerGroups([
        ['general', 'General'],
		['support', 'Support'],
        ['control', 'Bot Owners Only'],
        ['fun', 'Fun']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token)
