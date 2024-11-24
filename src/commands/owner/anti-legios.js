const { PREFIX } = require("../../config");
const { countCharacters } = require("../../utils/characterCounter");

module.exports = {
  name: "limpiar",
  description: "Elimina mensajes con más de 1000 caracteres",
  commands: ["limpiar", "clean"],
  usage: `${PREFIX}limpiar`,
  handle: async ({ message, client }) => {
    const text = message.body;
    const characterCount = countCharacters(text);
    const isAdmin = message.sender.isAdmin;

    if (text === `${PREFIX}limpiar 1`) {
      if (isAdmin) {
        client.sendMessage(message.from, "Comando de limpieza activado.");
      } else {
        client.sendMessage(message.from, "No puedes usar este comando porque no eres admin.");
      }
    } else if (text === `${PREFIX}limpiar 0`) {
      if (isAdmin) {
        client.sendMessage(message.from, "Comando de limpieza desactivado.");
      } else {
        client.sendMessage(message.from, "No puedes usar este comando porque no eres admin.");
      }
    } else {
      if (characterCount > 1000) {
        await client.deleteMessage(message.from, (link unavailable));
        await client.sendMessage(message.from, "Mensaje eliminado por exceder el límite de caracteres.");
      }
    }
  }
};
