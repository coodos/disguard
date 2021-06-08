const checkIsAdmin = async (msg) => {
  return await msg.member.roles.cache.some((role) => role.name === 'sudoers');
};

const checkIsSuperuser = async (msg) => {
  return await msg.member.roles.cache.some((role) => role.name === 'superuser');
};

export { checkIsAdmin, checkIsSuperuser };
