const commando = require('discord.js-commando');

module.exports = class EchoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'echo',
			aliases: ['speak'],
			group: 'fun',
			memberName: 'echo',
			description: 'A command that makes me say stuff',
			examples: ['echo example'],
			guildOnly: true,

			args: [
				{
					key: 'toEcho',
					label: 'toEcho',
					prompt: 'What would you like me to say?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
        msg.channel.send(args.toEcho)
	}
};