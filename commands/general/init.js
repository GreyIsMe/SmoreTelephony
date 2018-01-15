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
		let guildID = msg.guild.id;
		let ownerID = msg.guild.owner.id;
		guildID = guildID.slice(1,4);
		ownerID = ownerID.slice(1,5);

		let newnumber = `${'1-' + guildID + '-' + ownerID}`;

		console.log(newnumber)
		if (!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')) return msg.reply('You are not authorized to do this!')
		msg.guild.settings.set('number', newnumber)
		msg.guild.settings.set('numberChanID', msg.channel.id)
		msg.channel.send(`Number: ${msg.guild.settings.get('number')}\nNumberChannel: ${this.client.channels.get(msg.guild.settings.get('numberChanID')).name} `)
	}
};