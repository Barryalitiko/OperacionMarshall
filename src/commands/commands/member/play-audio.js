const { PREFIX } = require("../../config");
const { playAudio } = require("../../services/spider-x-api");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "play-audio",
  description: "Descargar musica",
  commands: ["music", "play", "m"],
  usage: `${PREFIX}music Me echa agua DIOLI`,
  handle: async ({
    sendAudioFromURL,
    args,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 Indicame la cancion que deseas descargar"
      );
    }

    await sendWaitReact();

    try {
      const data = await playAudio(args[0]);

      if (!data) {
        await sendErrorReply("👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 Cancion no encontrada");
        return;
      }

      await sendSuccessReact();

      await sendAudioFromURL(data.url);
    } catch (error) {
      console.log(error);
      await sendErrorReply(error.message);
    }
  },
};
