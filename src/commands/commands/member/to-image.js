const { PREFIX, TEMP_DIR } = require("../../config");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "toimage",
  description: "figuras en movimiento a imagen",
  commands: ["toimage", "img"],
  usage: `${PREFIX}toimage (etiqueta) o ${PREFIX}toimage (responde)`,
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendImageFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 Envia el archivo para convertir a imagen");
    }

    const inputPath = await downloadSticker(webMessage, "input");
    const outputPath = path.resolve(TEMP_DIR, "output.png");

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }

      await sendImageFromFile(outputPath);

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  },
};
