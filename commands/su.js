module.exports = {
    name: "su",
    run: async(client, message, args) => {
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
}

}
