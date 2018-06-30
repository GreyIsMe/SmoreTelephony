// Modules and inits
const commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
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

client.setProvider(
    sqlite.open(path.join(__dirname, '../data/settings.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

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
    // Registers custom command groups
    .registerGroups([
        ['general', 'General'],
		['support', 'Support'],
        ['control', 'Bot Owners Only'],
        ['fun', 'Fun']
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.calls = {
    createCall(details) {
        const callTo = client.channels.get(client.numbers.get(details.to))
        let callFrom = client.numbers.get(details.from)
        console.log(details)
		callFrom = client.channels.get(callFrom)
		let isEnabled = true
        const collector = callTo.createCollector(message => message.content.startsWith('call'), {
            time: 0
        })
        if (callTo === undefined) return;
        if (callFrom === undefined) return;
        callTo.send('Do `call answer` to answer call and do `call end` to deny call.')
        callTo.send(`:iphone: Call from ${details.from}`)
        collector.on('message', (message) => {
            if (message.content === 'call end') collector.stop('aborted')
            if (message.content === 'call answer') collector.stop('success')
        })
        collector.on('end', (collected, reason) => {
            if (reason === 'time') return message.reply('The call timed out.')
            if (reason === 'aborted') {
                  callFrom.send(':x: The call has been denied.')
                  callTo.send(':x: Succesfully denied call.')
            }
            if (reason === 'success') {
                callFrom.send(':heavy_check_mark: Call picked up!')
		        let sent = 0
		        client.on('message', message => {
		        	if (sent === 0) {
		        		//eslint-disable-next-line no-useless-escape
                        callFrom.send('Connected. Say \`call end\` at any time to end the call.');
                        callTo.send('Connected. Say \`call end\` at any time to end the call.');
		         		sent = 1;
		    	    }

		    	    function contact() {
		    	    	if (isEnabled === false) return
			        	if (message.author.id === client.user.id) return
				        if (message.content.startsWith('call end')) {
                            message.channel.send(':x: Call has been hung up.')
	    				    if (message.channel.id === callTo.id) callFrom.send(':x: The call was ended from the other side.')
		    			    if (message.channel.id === callFrom.id) callTo.send(':x: The call was ended from the other side.')

		    			    return isEnabled = false
			    	    }
			    	    if (message.channel.id === callTo.id) callFrom.send(`:telephone_receiver: ${message.author.tag}: ${message.cleanContent}`)
			    	    if (message.channel.id === callFrom.id) callTo.send(`:telephone_receiver: ${message.author.tag}: ${message.cleanContent}`)
			        }
                    contact()
                })
            }
        })
    }
}

client.login(config.token)
