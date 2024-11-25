const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

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
    if (antifloodOn) {
      client.on('message', async (message) => {
        const messageType = message.type;
        const messageText = message.text;
        const messageLength = messageText.length;

        if (messageLength > 1000) {
          if (messageType === WA_MESSAGE_TYPE.CHANGE_GROUP_PARTICIPANT_ADD) {
            // Mensaje enviado en un grupo
            const groupId = message.chat;
            const isAdmin = await client.isGroupAdmin(groupId, (link unavailable));
            if (isAdmin) {
              // Eliminar el mensaje
              await client.deleteMessage(groupId, (link unavailable));
              // Sacar a la persona del grupo
              await client.groupRemove(groupId, [message.sender]);
              // Enviar mensaje de "Grupo defendido"
              await client.sendMessage(groupId, 'Grupo defendido');
            } else {
              // Borrar el mensaje para el bot
              await client.deleteMessage(groupId, (link unavailable));
            }
          } else if (messageType === WA_MESSAGE_TYPE.TEXT) {
            // Mensaje enviado en privado
            const senderId = message.sender;
            // Enviar mensaje de "Bot modo defensivo"
            await client.sendMessage(senderId, 'Bot modo defensivo');
            // Borrar el mensaje
            await client.deleteMessage(senderId, (link unavailable));
            // Bloquear al usuario
            await client.blockUser(senderId);
          }
        }
      });
    } else {
      client.off('message');
    }
    await sendSuccessReact();
    const context = antifloodOn ? "activado" : "desactivado";
    await sendReply(`Modo antiflood ${context} con éxito.`);
  },
};
