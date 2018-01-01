const Commando = require('discord.js-commando');

module.exports = class InitCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'init',
			aliases: ['start'],
			group: 'main',
			memberName: 'init',
			description: 'A command',
			examples: ['command example'],
			guildOnly: true,

			// args: [
			// 	{
			// 		key: 'commandArg',
			// 		label: 'commandArg',
			// 		prompt: 'What would you like to do?',
			// 		type: 'string'
			// 	}
			// ]
		});
	}

	async run(msg, args) {
		let newnumber = `${this.client.shard.id + '-' + msg.guild.id.slice(1,4) + '-' + 'FIRST 4 OF GUILD OWNER ID'}`
		console.log(newnumber)
		msg.guild.settings.set('number', `${this.client.shard.id + '-' + msg.guild.id.slice(1,4) + '-' + 'FIRST 4 OF GUILD OWNER ID'}`)
		msg.channel.send(`Number: ${msg.guild.settings.get('number')}`)
		msg.reply('Self Harm')
	}
};