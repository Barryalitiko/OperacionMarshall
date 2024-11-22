module.exports = {
  name: "comando-especial",
  description: "Comando solo para usuarios con caracteres especiales en su nombre",
  commands: ["comandoespecial"],
  usage: `${PREFIX}comandoespecial <descripcion>`,
  handle: async ({ userJid, args, socket, sendErrorReply, sendReply, remoteJid }) => {
    // Verificar si el usuario tiene los caracteres especiales en su nombre
    const hasSpecialCharsPermission = await checkPermission({
      type: "special", // Verificación de caracteres especiales en el nombre
      socket,
      userJid,
      remoteJid,
    });

    if (!hasSpecialCharsPermission) {
      await sendErrorReply("❌ No tienes permiso para ejecutar este comando. Este comando está reservado para usuarios con caracteres especiales en su nombre.");
      return;
    }

    // Si el usuario tiene permiso, ejecutamos el comando
    await sendReply(`✅ Comando ejecutado correctamente, ${args.join(" ")}. ¡Tienes acceso a este comando por los caracteres especiales en tu nombre!`);
  },
};
