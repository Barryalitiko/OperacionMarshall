const { PREFIX } = require("../../config");

module.exports = {
  name: "ping",
  description: "Verificar se o bot está online",
  commands: ["ping"],
  usage: `${PREFIX}ping`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🏓");
    await sendReply({
      text: `🏓 Pong!`,
      forwarded: true,
      forwardedFrom: {
        id: "OM",
        name: "OM Verificado"
      }
    });
  },
};