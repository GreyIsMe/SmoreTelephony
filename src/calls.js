module.exports = client => client.calls = new Calls(client);

class Calls {

    constructor(client) {
        this.client = client;
    }

    createNumber(msg) {

        const number = `1-${msg.guild.id.slice(1, 4)}-${msg.guild.owner.id.slice(1, 5)}`;

        msg.guild.settings.set('number', number);
        msg.guild.settings.set('numberChanID', msg.channel.id);

        this.setNumber(number, msg.channel.id);
    }

    setNumber(number, id) {
        this.client.numbers.set(number, {
            number,
            id,
        });
    }

    getNumber({ from, to, msg }) {

        const numberTo = this.client.numbers.get(to);
        const numberFrom = this.client.numbers.get(from);

        if (!numberTo) return msg.say('I can not find that number.');
        if (!numberFrom) return msg.say('I can not find your number.');

        const callTo = this.client.channels.get(numberTo);
        const callFrom = this.client.numbers.get(numberFrom);

        if (!callTo) return msg.say('I can not find the channel associated with that number.');
        if (!callFrom) return msg.say('I can not find the channel associated with your number.');

        return { 
            callTo, 
            callFrom,
        };
    }

    createCall(details) {

        const client = this.client;

        const { callTo, callFrom } = this.getNumber(details);

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
    
};
