const commando = require('discord.js-commando');

module.exports = class CallCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'call',
			aliases: ['dial'],
			group: 'general',
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
		let callObj = { to: args.callNumber, from: msg.guild.settings.get('number'), caller:msg.author}
		if(msg.guild.settings.get('numberChanID') !== msg.channel.id) return msg.channel.send(`You must call from #${this.client.channels.get(msg.guild.settings.get('numberChanID')).name}`)
		this.client.calls.createCall(callObj)
	}
};
