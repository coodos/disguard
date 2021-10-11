import { MessageEmbed } from 'discord.js';
import { checkIsAdmin, checkIsSuperuser } from '../functions/checkAdmin.js';
import { successEmbed, errorEmbed, regularEmbed } from '../functions/embeds.js';

const userNotRoot = (msg) => {
  errorEmbed(
    msg,
    '( ಠ_ಠ)',
    'error: you cannot perform this operation unless you are root.'
  );
};

/*
 *  @event  MESSAGE `$su`
 *  @desc   Checks if the user is allowed to run sudo commands
 *          and gives superuser role if the user has sufficient
 *          permissions
 */

const superuser = async (msg) => {
  if (await checkIsAdmin(msg)) {
    var superuser = await msg.guild.roles.cache.find(
      (role) => role.name === 'superuser'
    );

    if (
      await msg.member.roles.cache.some((role) => role.name === 'superuser')
    ) {
      msg.member.roles.remove(superuser);
      successEmbed(msg, '(◉ܫ◉)', 'All done...');
    } else {
      msg.member.roles.add(superuser);
      successEmbed(
        msg,
        '(⌐■_■)',
        `Deal with it B) \`${msg.author.username}\` is now playing life in creative mode`
      );
    }
  } else {
    errorEmbed(
      msg,
      '( ಠ_ಠ)',
      `\`${msg.author.username}\` is not in the sudoers file. This incident will be reported.`
    );
  }
};

/*
 *  @event    Message `$exit`
 *  @desc     Remove the superuser role
 */

const exitSuperuser = async (msg) => {
  if (await checkIsAdmin(msg)) {
    var superuser = await msg.guild.roles.cache.find(
      (role) => role.name === 'superuser'
    );

    if (
      await msg.member.roles.cache.some((role) => role.name === 'superuser')
    ) {
      msg.member.roles.remove(superuser);
      regularEmbed(msg, '(◉ܫ◉)', 'All done...');
    } else {
      errorEmbed(
        msg,
        '( ಠ_ಠ)',
        'you were not a superuser in the first place, SMH-ing my head'
      );
    }
  } else {
    const embed = new MessageEmbed();
    userNotRoot(msg);
  }
};

/*
 *  @event    Message `$kick`
 *  @desc     Kicks the user mentined with a pingy pongy
 */

const kickUser = async (msg) => {
  if (await checkIsSuperuser(msg)) {
    const arr = msg.content.split(' ');
    const reason =
      arr.slice(2, arr.length).join(' ') || 'command from disguard';
    if (msg.member.hasPermission('KICK_MEMBERS')) {
      if (msg.mentions.members.first()) {
        try {
          await msg.mentions.members.first().kick(reason);
          successEmbed(
            msg,
            '(^▼ｪ▼ﾒ^)',
            `\`${msg.mentions.members.first().user.username}\` I keel you!!!`
          );
        } catch (error) {
          errorEmbed(
            msg,
            ':(',
            'Senpai I dont have the right permissions for this action :/'
          );
        }
      } else {
        userNotRoot(msg);
      }
    }
  } else {
    userNotRoot(msg);
  }
};

/*
 *  @desc    Ban the user mentioned with a pingy pongy
 *  @event   MESSAGE `$ban`
 */

const banUser = async (msg) => {
  if (await checkIsSuperuser(msg)) {
    const arr = msg.content.split(' ');
    const reason =
      arr.slice(2, arr.length).join(' ') || 'command from disguard';
    if (msg.member.hasPermission('BAN_MEMBERS')) {
      if (msg.mentions.members.first()) {
        try {
          await msg.mentions.members.first().ban({ reason });
          successEmbed(
            msg,
            '(^▼ｪ▼ﾒ^)',
            `\`${
              msg.mentions.members.first().user.username
            }\` SILENCE! I keel you!!!`
          );
        } catch (error) {
          errorEmbed(
            msg,
            ':(',
            'Senpai I dont have the right permissions for this action :/'
          );
        }
      } else {
        userNotRoot(msg);
      }
    }
  } else {
    userNotRoot(msg);
  }
};

/*
 *  @desc    mute user
 *  @event   MESSAGE `$mute`
 */

const muteUser = async (msg) => {
  if (await checkIsSuperuser(msg)) {
    var muted = await msg.guild.roles.cache.find(
      (role) => role.name === 'silenced'
    );
    if (
      await msg.mentions.members
        .first()
        .roles.cache.some((role) => role.name === 'sudoers')
    ) {
      errorEmbed(msg, '( ಠ_ಠ)', 'Senpai, you cannot mute fellow sudoers :/');
    } else {
      await msg.mentions.members.first().roles.add(muted);
      successEmbed(
        msg,
        '(^▼ｪ▼ﾒ^)',
        `\`${
          msg.mentions.members.first().user.username
        }\` SILENCE! YOU HAVE BEEN MUTED!!!`
      );
    }
  } else {
    userNotRoot(msg);
  }
};

/*
 *  @desc    mute user
 *  @event   MESSAGE `$mute`
 */

const unmuteUser = async (msg) => {
  if (await checkIsSuperuser(msg)) {
    var muted = await msg.guild.roles.cache.find(
      (role) => role.name === 'silenced'
    );
    await msg.mentions.members.first().roles.remove(muted);
    successEmbed(
      msg,
      ':)',
      `\`${
        msg.mentions.members.first().user.username
      }\` you are allowed to talk again now, please don't screw this up :P`
    );
  } else {
    userNotRoot(msg);
  }
};

export { superuser, kickUser, banUser, muteUser, unmuteUser, exitSuperuser };
