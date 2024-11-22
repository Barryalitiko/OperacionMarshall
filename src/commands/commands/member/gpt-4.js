const { PREFIX } = require("../../config");
const { gpt4 } = require("../../services/spider-x-api");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "gpt-4",
  description: "IA",
  commands: ["gpt-4", "gpt", "krampus"],
  usage: `${PREFIX}gpt que es Krampus?`,
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 𝚑𝚊𝚣𝚖𝚎 𝚞𝚗𝚊 𝚙𝚛𝚎𝚐𝚞𝚗𝚝𝚊 𝚙𝚊𝚛𝚊 𝚙𝚘𝚍𝚎𝚛 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛"
      );
    }

    await sendWaitReply();

    const responseText = await gpt4(text);

    await sendSuccessReply(responseText);
  },
};
