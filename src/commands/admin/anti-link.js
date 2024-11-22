module.exports = {
  name: "anti-legios",
  description: "Prueba básica del comando anti-legios",
  commands: ["anti-legio", "antilegios"],
  handle: async ({ args, sendReply }) => {
    await sendReply(`¡El comando fue recibido! Argumentos: ${args}`);
  },
};
