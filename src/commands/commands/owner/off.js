const { PREFIX } = require("../../config");
const { deactivateGroup } = require("../../utils/database");

module.exports = {
  name: "off",
  description: "Apaga el bot",
  commands: ["off"],
  usage: `${PREFIX}off`,
  handle: async ({ sendSuccessReply, remoteJid }) => {
    deactivateGroup(remoteJid);

    await sendSuccessReply("👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 𝚋𝚘𝚝 𝚊𝚙𝚊𝚐𝚊𝚍𝚘");
  },
};
