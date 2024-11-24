const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { activateCleanMode, deactivateCleanMode } = require("../../utils/database");

module.exports = {
  name: "limpiar",
  description: "Activa o desactiva el modo de limpieza en el grupo.",
  commands: ["limpiar"],
  usage: `${PREFIX}limpiar (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, isAdmin }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Debes indicar 1 (activar) o 0 (desactivar) el modo limpieza."
      );
    }

    const cleanModeOn = args[0] === "1";
    const cleanModeOff = args[0] === "0";

    if (!cleanModeOn && !cleanModeOff) {
      throw new InvalidParameterError(
        "Debes indicar 1 (activar) o 0 (desactivar) el modo limpieza."
      );
    }

    if (!isAdmin) {
      throw new InvalidParameterError(
        "No tienes permisos para usar este comando."
      );
    }

    if (cleanModeOn) {
      activateCleanMode(remoteJid);
    } else {
      deactivateCleanMode(remoteJid);
    }

    await sendSuccessReact();

    const context = cleanModeOn ? "activado" : "desactivado";
    await sendReply(`Modo de limpieza ${context} con éxito.`);
  },
};
