const commando = require('discord.js-commando');

module.exports = class CallCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'call',
			aliases: ['dial'],
			group: 'main',
			memberName: 'call',
			description: 'Calls a channel',
			examples: ['call 1-134-234-3244'],
			guildOnly: true,

			args: [
				{
					key: 'callNumber',
					label: 'callNumber',
					prompt: 'Who would you like to call?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
        const caller = msg.author
        
	}
};