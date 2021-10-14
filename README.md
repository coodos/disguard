# Disguard: A bot to rule them all

## Introduction

DisGuard is a **moderation** bot which is a result of my obsession with linux and linux commands.

The idea is that everyone in the server would have an equal role with no difference between mods and regular users visible to a regular user. This would make the users behave as they would in a normal conversation and not how they would thinking someone is constantly moderating them.

Whenever moderation is needed, a mod or an admin who has the 'sudoers' role can execute `$su` to get the privileges required for moderation and will be displayed seprately.

### How it is linked to linux

This is bot is based on the principle of linux. The way linux has every user as a standard user and the system admin is no different and whenever the system admin wants to run any command which requires higher privledges they can get into root with `$su`, the same way you can get the highest privledges after running `$su` else, everyone's a normal user.

To prevent any normal user from accessing root, 'sudo' has a sudoers file where the users who can access sudo are mentioned, the same way, you give sudoers role to the people who can access the `$su` command.

## How to get it?

You can invite the bot by clicking the link below.
[Invite the Bot](https://discord.com/api/oauth2/authorize?client_id=851740851100319744&permissions=8&scope=bot)

Or if it doesn't work, you can copy paste it in your browser: https://discord.com/api/oauth2/authorize?client_id=851740851100319744&permissions=8&scope=bot

## Commands List

| Command   | Description                                                                                       | Example        |
| --------- | ------------------------------------------------------------------------------------------------- | -------------- |
| `$su`     | It gives the user the role of superuser, hence they are now able to manage the server and members | `$su`          |
| `$kick`   | Kicks the user pinged                                                                             | `$kick @joe`   |
| `$ban`    | Bans the user pinged                                                                              | `$ban @joe`    |
| `$mute`   | Mutes the pinged user                                                                             | `$mute @joe`   |
| `$unmute` | Unmutes the pinged user                                                                           | `$unmute @joe` |
| `$exit`   | Exits out of the superuser role                                                                   | `$exit`        |
| `$config` | creates roles for the server                                                                      | `$config`      |
| `$warn`   | issue a warning to a pinged user                                                                  | `$warn @joe`   |
| `$warning`| See the history of previous infractions of a user                                                 | `$warning @joe`|
| `$man`    | To get help related to a specific command type                                                    | `$man ban`     |
----------------------------------------------------------------------------------------------------------------------------------

## License

This code is licensed under GPL v2.0. You can find the full License in LICENSE file.

## Contribution

You can contribute by opening an issue if you find a bug. If you want to contribute code, then you may first open an issue and ask it to be assigned it to you before you start coding it and after it is assigned to you then you may code it and send a PR.
