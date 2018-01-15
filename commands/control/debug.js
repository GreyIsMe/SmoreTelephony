//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fs = require('fs');
//eslint-disable-next-line no-sync

module.exports = class DebugCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'debug',
      aliases: ['getguildsettings', 'guildsettings', 'sinfo', 'serverinfo'],
      group: 'control',
      memberName: 'debug',
      description: 'Gets the settings for the specified guild.',
      details: oneLine `
      This command gets the settings for the specified guild.
      This is useful for random errors possibly originating from guild settings.
      Permission is locked to developers. Duh!
			`,
      examples: ['debug 1234567890'],

      args: [{
        key: 'guild',
        label: 'guild',
        prompt: 'What server would you like to debug?',
        type: 'string',
        infinite: false
      }],

      guarded: true
    });
  }

  hasPermission(msg) {
    return this.client.isOwner(msg.author);
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    if (args.guild.toLowerCase() === 'local') {
      let announcements = message.guild.settings.get('announcements')
      //eslint-disable-next-line no-undefined
      //eslint-disable-next-line no-undefined
      if (announcements === undefined) announcements = 'not set'

      message.reply(`__**Guild Info**__
**Guild**: ${message.guild.id}
**Name**: ${message.guild.name}
**Owner**: ${message.guild.owner.user.tag} (${message.guild.owner.id})
**Created At:** ${message.guild.createdAt}
**Members**: ${message.guild.members.size}
**Bots**: ${message.guild.members.filter(u => u.user.bot).size} (${Math.floor(message.guild.members.filter(u => u.user.bot).size / message.guild.members.size * 100)}%)
**Humans**: ${message.guild.members.filter(u => !u.user.bot).size} (${Math.floor(message.guild.members.filter(u => !u.user.bot).size / message.guild.members.size * 100)}%)
**Text Channels**: ${message.guild.channels.filter(channel => channel.type === 'text').size}
**Voice Channels**: ${message.guild.channels.filter(channel => channel.type === 'voice').size}
**Default Channel**: ${message.guild.defaultChannel}
**Roles**: ${message.guild.roles.size}

__**Settings**__
**Global announcements**: "${announcements}"
**Number**: "${number}"
**NumberChanID**: "#${this.client.channels.get(numberChanID).name} / ${numberChanID}")`)
    } else {
      let guild = this.client.guilds.get(args.guild)

      let announcements = guild.settings.get('announcements')
      let number = guild.settings.get('number')
      let numberChanID = guild.settings.get('numberChanID')
      //eslint-disable-next-line no-undefined
      if (announcements === undefined) announcements = 'not set'
      if (number === undefined) number = 'not set'
      if (numberChanID === undefined) numberChanID = 'not set'

      message.reply(`__**Guild Info**__
**Guild**: ${guild.id}
**Name**: ${guild.name}
**Owner**: ${guild.owner.user.tag} (${guild.owner.id})
**Created At:** ${guild.createdAt}
**Members**: ${guild.members.size}
**Bots**: ${guild.members.filter(u => u.user.bot).size} (${Math.floor(guild.members.filter(u => u.user.bot).size / guild.members.size * 100)}%)
**Humans**: ${guild.members.filter(u => !u.user.bot).size} (${Math.floor(guild.members.filter(u => !u.user.bot).size / guild.members.size * 100)}%)
**Text Channels**: ${guild.channels.filter(channel => channel.type === 'text').size}
**Voice Channels**: ${guild.channels.filter(channel => channel.type === 'voice').size}
**Default Channel**: ${guild.defaultChannel}
**Roles**: ${guild.roles.size}

__**Settings**__
**Global announcements**: "${announcements}"
**Number**: "${number}"
**NumberChanID**: "#${this.client.channels.get(numberChanID).name} / ${numberChanID}"`)
    }
  }
};

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack);
});
