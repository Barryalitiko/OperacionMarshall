const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { isCharacterCountActive } = require("../../database");

const CHARACTER_LIMIT = 1000;  // Ajusta este límite según lo que consideres apropiado

module.exports = {
  name: "antiflood",
  description: "Activa o desactiva el modo de protección contra flood en el grupo.",
  commands: ["antiflood"],
  usage: `${PREFIX}antiflood (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, isAdmin, client }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Debes indicar 1 (activar) o 0 (desactivar) el modo antiflood."
      );
    }

    const antifloodOn = args[0] === "1";
    const antifloodOff = args[0] === "0";

    if (!antifloodOn && !antifloodOff) {
      throw new InvalidParameterError(
        "Debes indicar 1 (activar) o 0 (desactivar) el modo antiflood."
      );
    }

    if (!isAdmin) {
      throw new InvalidParameterError(
        "No tienes permisos para usar este comando."
      );
    }

    // Registrar el modo antiflood
    if (antifloodOn) {
      client.on('message', async (message) => {
        try {
          const { type: messageType, text: messageText, chat: groupId, sender } = message;

          // Verificar si el grupo tiene activado el contador de caracteres
          const isCharacterCountingEnabled = await isCharacterCountActive(groupId);

          // Si el contador de caracteres está habilitado, verificamos la longitud del mensaje
          if (isCharacterCountingEnabled && messageText) {
            const messageLength = messageText.length;

            if (messageLength > CHARACTER_LIMIT) {
              // Acción de protección contra flood (expulsar al usuario en caso de flood)
              if (messageType === "group" && groupId) {
                const isSenderAdmin = await client.isGroupAdmin(groupId, sender);

                if (!isSenderAdmin) {
                  // Eliminar mensaje y expulsar
                  await client.deleteMessage(groupId, { id: message.id, remoteJid: groupId });
                  await client.groupRemove(groupId, [sender]);
                  await client.sendMessage(groupId, "Grupo defendido: usuario expulsado por flood.");
                }
              } else {
                // Mensaje privado
                await client.sendMessage(sender, "Bot en modo defensivo: no se permiten mensajes largos.");
                await client.deleteMessage(sender, { id: message.id, remoteJid: sender });
                await client.blockUser(sender);
              }
            }
          }
        } catch (error) {
          console.error("Error en antiflood:", error);
        }
      });
    } else {
      // Eliminar manejador del evento
      client.off('message');
    }

    await sendSuccessReact();

    const context = antifloodOn ? "activado" : "desactivado";
    await sendReply(`Modo antiflood ${context} con éxito.`);
  },
};
