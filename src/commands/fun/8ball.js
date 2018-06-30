const Commando = require('discord.js-commando');
const eightball = require('./8ball.json')

module.exports = class Ball8Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			aliases: ['ballof8'],
			group: 'fun',
			memberName: '8ball',
			description: 'Ask and you shall receive',
			examples: ['8ball Is my hand broken?'],
            guildOnly: true
            
            // args: [
			// 	{
			// 		key: '8ballQuestion',
			// 		label: '8ball',
			// 		prompt: 'What would you like to ask the all knowing 8ball?',
			// 		type: 'string'
			// 	}
			// ]
		});
	}

	async run(msg, args) {
        let coolVar = Math.floor(Math.random() * eightball.length)
        console.log(eightball)
		msg.channel.send(`${eightball[coolVar]}`);
	}
};