
const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "seguridad",
  description: "Activa o desactiva las características de seguridad del bot.",
  commands: ["seguridad"],
  usage: `${PREFIX}seguridad (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, isAdmin, client }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Debes indicar 1 (activar) o 0 (desactivar) las características de seguridad."
      );
    }
    const seguridadOn = args[0] === "1";
    const seguridadOff = args[0] === "0";
    if (!seguridadOn && !seguridadOff) {
      throw new InvalidParameterError(
        "Debes indicar 1 (activar) o 0 (desactivar) las características de seguridad."
      );
    }
    if (!isAdmin) {
      throw new InvalidParameterError(
        "No tienes permisos para usar este comando."
      );
    }
    if (seguridadOn) {
      client.on('message', async (message) => {
        const messageType = message.type;
        const messageText = message.text;
        const messageLength = messageText.length;
        const senderId = message.sender;
        const groupId = message.chat;

        // Detección de spam
        if (messageLength > 1000) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener spam.');
        }

        // Detección de phishing
        if (messageText.includes('http://') || messageText.includes('https://')) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener un enlace sospechoso.');
        }

        // Detección de malware
        if (messageText.includes('.exe') || messageText.includes('.zip')) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener un archivo sospechoso.');
        }

        // Detección de flood de imágenes
        if (messageType === WA_MESSAGE_TYPE.IMAGE) {
          const imageCount = await client.getImageCount(groupId);
          if (imageCount > 5) {
            await client.deleteMessage(groupId, (link unavailable));
            await client.sendMessage(groupId, 'Mensaje eliminado por contener un flood de imágenes.');
          }
        }

        // Detección de mensajes repetidos
        if (messageText === messageText.repeat(5)) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por ser un mensaje repetido.');
        }

        // Detección de mensajes con caracteres especiales
        if (messageText.includes('!') || messageText.includes('@') || messageText.includes('#')) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener caracteres especiales.');
        }

        // Detección de mensajes con enlaces
        if (messageText.includes('http://') || messageText.includes('https://')) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener un enlace sospechoso.');
        }

        // Detección de mensajes con archivos adjuntos
        if (messageType === WA_MESSAGE_TYPE.DOCUMENT) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener un archivo adjunto.');
        }

        // Detección de patrones de ataque
        if (messageText.includes('ataque') || messageText.includes('hacking')) {
          await client.deleteMessage(groupId, (link unavailable));
          await client.sendMessage(groupId, 'Mensaje eliminado por contener un patrón de ataque.');
        }
      });
    } else {
      client.off('message');
    }
    await sendSuccessReact();
    const context = seguridadOn ? "activado" : "desactivado";
    await sendReply(`Características de seguridad ${context} con éxito.`);
  },
};
