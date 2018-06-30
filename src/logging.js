const commando = require('discord.js-commando');

module.exports = client => 
client
.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `${client.commandPrefix}help | ${client.guilds.size} servers`,
            type: 0
        }
    });
    console.log('Awaiting actions.');
})
.on('disconnect', () => console.warn('Disconnected!'))
.on('reconnecting', () => console.warn('Reconnecting...'))
.on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
})
.on('commandBlocked', (msg, reason) => {
    console.log(oneLine `
        Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
        blocked; ${reason}
    `);
})
.on('commandPrefixChange', (guild, prefix) => {
    console.log(oneLine `
        Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
        ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `);
})
.on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine `
        Command ${command.groupID}:${command.memberName}
        ${enabled ? 'enabled' : 'disabled'}
        ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `);
})
.on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine `
        Group ${group.id}
        ${enabled ? 'enabled' : 'disabled'}
        ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `);
})
.on('commandRun', (command, promise, msg) => {
    if (msg.guild) {
        console.log(`Command ran
    Guild: ${msg.guild.name} (${msg.guild.id})
    Channel: ${msg.channel.name} (${msg.channel.id})
    User: ${msg.author.tag} (${msg.author.id})
    Command: ${command.groupID}:${command.memberName}
    Message: "${msg.content}"`)
    } else {
        console.log(`Command ran:
    Guild: DM
    Channel: N/A
    User: ${msg.author.tag} (${msg.author.id})
    Command: ${command.groupID}:${command.memberName}
    Message: "${msg.content}"`)
    }
})
.on('guildCreate', (guild) => {
    console.log(`New guild added:
Guild: ${guild.id}
Name: ${guild.name}
Owner: ${guild.owner.user.tag} (${guild.owner.id})
Created At: ${guild.createdAt}
Members: ${guild.members.size}
Bots: ${guild.members.filter(u => u.user.bot).size} (${Math.floor(guild.members.filter(u => u.user.bot).size / guild.members.size * 100)}%)
Humans: ${guild.members.filter(u => !u.user.bot).size} (${Math.floor(guild.members.filter(u => !u.user.bot).size / guild.members.size * 100)}%)
Now on: ${client.guilds.size} servers`)
    client.channels.get('330701184698679307').send(`New guild added:
Guild: ${guild.id}
Name: ${guild.name}
Owner: ${guild.owner.user.tag} (${guild.owner.id})
Created At: ${guild.createdAt}
Members: ${guild.members.size}
Bots: ${guild.members.filter(u => u.user.bot).size} (${Math.floor(guild.members.filter(u => u.user.bot).size / guild.members.size * 100)}%)
Humans: ${guild.members.filter(u => !u.user.bot).size} (${Math.floor(guild.members.filter(u => !u.user.bot).size / guild.members.size * 100)}%)
Now on: ${client.guilds.size} servers`)
    let botPercentage = Math.floor(guild.members.filter(u => u.user.bot).size / guild.members.size * 100)
    if (botPercentage >= 80) {
        let found = 0
        //eslint-disable-next-line array-callback-return
        guild.channels.map((c) => {
            if (found === 0) {
                if (c.type === 'text') {
                    if (c.permissionsFor(client.user).has('VIEW_CHANNEL') === true) {
                        if (c.permissionsFor(client.user).has('SEND_MESSAGES') === true) {
                            c.send('**ALERT:** Your guild has been marked as an illegal guild. \nThis may be due to it being marked as a bot guild or marked as a spam guild. \nThe bot will now leave this server.')
                            c.send('If you wish to speak to my developers, you may find them here: https://discord.gg/6P6MNAU')
                            found = 1
                        }
                    }
                }
            }
        })
        guild.owner.send(`**ALERT:** Your guild, "${guild.name}", has been marked as an illegal guild. \nThis may be due to it being marked as a bot guild or marked as a spam guild. \nThe bot will now leave the server. \nIf you wish to speak to my developer, you may join here: https://discord.gg/t8xHbHY`)
        guild.leave()
        //eslint-disable-next-line newline-before-return
        return
    }
    client.user.setPresence({
        game: {
            name: `${config.prefix}help | ${client.guilds.size} servers`,
            type: 0
        }
    })
    guild.settings.set('announcements', 'on')
    const embed = new RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle(`Hello, I'm ${client.user.username}!`)
        .setColor(0x00FF00)
        .setDescription(`Thanks for adding me to your server, "${guild.name}"! To see commands do ${guild.commandPrefix}help. Please note: By adding me to your server and using me, you affirm that you agree to [our TOS](https://smoresoft.uk/tos.html).\nBefore calling anyone, please do ${client.commandPrefix}init`)
    guild.owner.send({ embed })
    let found = 0
    //eslint-disable-next-line array-callback-return
    guild.channels.map((c) => {
        if (found === 0) {
            if (c.type === 'text') {
                if (c.permissionsFor(client.user).has('VIEW_CHANNEL') === true) {
                    if (c.permissionsFor(client.user).has('SEND_MESSAGES') === true) {
                        c.send({ embed })
                        found = 1
                    }
                }
            }
        }
    })
})
.on('guildDelete', (guild) => {
    console.log(`Existing guild left:
Guild: ${guild.id}
Name: ${guild.name}
Owner: ${guild.owner.user.tag} (${guild.owner.id})
Created At: ${guild.createdAt}
Members: ${guild.members.size}
Bots: ${guild.members.filter(u => u.user.bot).size} (${Math.floor(guild.members.filter(u => u.user.bot).size / guild.members.size * 100)}%)
Humans: ${guild.members.filter(u => !u.user.bot).size} (${Math.floor(guild.members.filter(u => !u.user.bot).size / guild.members.size * 100)}%)
Now on: ${client.guilds.size} servers`)
    client.channels.get('330701184698679307').send(`Existing guild left:
Guild: ${guild.id}
Name: ${guild.name}
Owner: ${guild.owner.user.tag} (${guild.owner.id})
Created At: ${guild.createdAt}
Members: ${guild.members.size}
Bots: ${guild.members.filter(u => u.user.bot).size} (${Math.floor(guild.members.filter(u => u.user.bot).size / guild.members.size * 100)}%)
Humans: ${guild.members.filter(u => !u.user.bot).size} (${Math.floor(guild.members.filter(u => !u.user.bot).size / guild.members.size * 100)}%)
Now on: ${client.guilds.size} servers`)
    client.user.setPresence({
        game: {
            name: `${config.prefix}help | ${client.guilds.size} servers`,
            type: 0
        }
    })
});
