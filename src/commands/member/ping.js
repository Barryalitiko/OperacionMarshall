const { PREFIX } = require("../../config");

module.exports = {
  name: "ping",
  description: "verificar que el bot este activo",
  commands: ["om"],
  usage: `${PREFIX}om`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("👻");
    await sendReply(`Oᴘᴇʀᴀᴄɪᴏɴ Mᴀʀsʜᴀʟʟ ༴༎👻༎`);
  },
};
