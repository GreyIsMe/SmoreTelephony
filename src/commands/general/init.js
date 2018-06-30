const Commando = require('discord.js-commando');

module.exports = class InitCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'init',
			aliases: ['start'],
			group: 'general',
			memberName: 'init',
			description: 'A command',
			examples: ['command example'],
			guildOnly: true,
		});
	}

	async run(msg, args) {

		if (!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')) 
			return msg.reply('You are not authorized to do this!');
		
		this.client.calls.createNumber(msg);	
		
		msg.channel.send(`Number: ${msg.guild.settings.get('number')}\nNumberChannel: ${this.client.channels.get(msg.guild.settings.get('numberChanID')).name} `)
	}
};