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

		const callObj = { 
			to: args.callNumber, 
			from: msg.guild.settings.get('number'), 
			msg,
		};

		if(msg.guild.settings.get('numberChanID') === msg.channel.id) 
			return this.client.calls.createCall(callObj);

		const numberChanID = msg.guild.settings.get('numberChanID');

		if (!numberChanID) return msg.say('This guild does not have `numberChanID` set.');

		const channel = this.client.channels.get(numberChanID);

		if (!channel) return msg.say('I can not find that channel.');

		msg.say(`You must call from #${channel.name}`);
	}
};
