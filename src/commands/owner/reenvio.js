const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { activateForwardModeGroup, deactivateForwardModeGroup, isForwardModeActive } = require("../../utils/database");

module.exports = {
  name: "forward-mode",
  description: "Activa o desactiva el modo de reenvío en el grupo.",
  commands: ["forward-mode"],
  usage: `${PREFIX}forward-mode (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, isAdmin }) => {
    if (!args.length) {
      throw new InvalidParameterError("Debes indicar 1 (activar) o 0 (desactivar) el modo de reenvío.");
    }

    const forwardModeOn = args[0] === "1";
    const forwardModeOff = args[0] === "0";

    if (!forwardModeOn && !forwardModeOff) {
      throw new InvalidParameterError("Debes indicar 1 (activar) o 0 (desactivar) el modo de reenvío.");
    }

    if (!isAdmin) {
      throw new InvalidParameterError("No tienes permisos para usar este comando.");
    }

    if (forwardModeOn) {
      activateForwardModeGroup(remoteJid);
    } else {
      deactivateForwardModeGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = forwardModeOn ? "activado" : "desactivado";
    await sendReply(`Modo de reenvío ${context} con éxito.`);
  },
};
