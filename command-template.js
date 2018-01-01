const commando = require('discord.js-commando');

module.exports = class Command extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'command',
			aliases: ['commandalias'],
			group: 'main',
			memberName: 'command',
			description: 'A command',
			examples: ['command example'],
			guildOnly: true,

			args: [
				{
					key: 'commandArg',
					label: 'commandArg',
					prompt: 'What would you like to do?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
        msg.channel.send(args.commandArg)
	}
};