const { PREFIX } = require("../../config");
const { activateGroup } = require("../../utils/database");

module.exports = {
  name: "on",
  description: "Enciende el bot",
  commands: ["on"],
  usage: `${PREFIX}on`,
  handle: async ({ sendSuccessReply, remoteJid }) => {
    activateGroup(remoteJid);

    await sendSuccessReply("Bot encendido");
  },
};
