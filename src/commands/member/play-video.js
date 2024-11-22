const { PREFIX } = require("../../config");
const { playAudio, playVideo } = require("../../services/spider-x-api");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "play-video",
  description: "Descarga videos",
  commands: ["video", "v"],
  usage: `${PREFIX}video LOFI Wilmer Roberts`,
  handle: async ({
    sendVideoFromURL,
    args,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 Indicame el video que deseas descargar"
      );
    }

    await sendWaitReact();

    try {
      const data = await playVideo(args[0]);

      if (!data) {
        await sendErrorReply("👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 video no encontrado");
        return;
      }

      await sendSuccessReact();

      await sendVideoFromURL(data.url);
    } catch (error) {
      console.log(error);
      await sendErrorReply(JSON.stringify(error.message));
    }
  },
};
