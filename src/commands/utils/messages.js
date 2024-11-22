const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

exports.menuMessage = () => {
  const date = new Date();

  return `ᵏʳᵃᵐᵖᵘˢ ᵇᵒᵗ
╭━─━─━─≪ 𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼 ≫─━─━─━╮

⌠⅏⌡➟ ${BOT_NAME}
⌠⅏⌡➟ 𝙵𝚎𝚌𝚑𝚊: ${date.toLocaleDateString("es-ES")}
⌠⅏⌡➟ 𝙷𝚘𝚛𝚊: ${date.toLocaleTimeString("es-ES")}
⌠⅏⌡➟ 𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜: ${PREFIX}

╰━─━─━─≪       👻       ≫─━─━─━╯

━━━━━━━⛥ 𝗢𝗠 ༴༎👻༎ ⛦━━━━━━━

𝙾 𝙿 𝙴 𝚁 𝙰 𝙲 𝙸 𝙾 𝙽  𝙼 𝙰 𝚁 𝚂 𝙷 𝙰 𝙻 𝙻

╧╤╧╤╧╤╧╤ 𝐊 𝐑 𝐀 𝐌 ╧╤╧╤╧╤╧╤

⌠⅏⌡➟ ${PREFIX}off
⌠⅏⌡➟ ${PREFIX}on

╭━─━─━─≪ 𝗔𝗗𝗠𝗜𝗡𝗦 ≫─━─━─━╮

⌠⅏⌡➟ ${PREFIX}nolink (s/n)
⌠⅏⌡➟ ${PREFIX}auto-responder (s/n)
⌠⅏⌡➟ ${PREFIX}ban
⌠⅏⌡➟ ${PREFIX}todos
⌠⅏⌡➟ ${PREFIX}bienvenida (s/n)

╰━─━─━─≪       👻       ≫─━─━─━╯

━━━━━━━⛥ 𝗢𝗠 ༴༎👻༎ ⛦━━━━━━━

╭━─━─━─≪   𝗠𝗘𝗡𝗨   ≫─━─━─━╮

⌠⅏⌡➟ ${PREFIX}attp
⌠⅏⌡➟ ${PREFIX}cep
⌠⅏⌡➟ ${PREFIX}krampus 
⌠⅏⌡➟ ${PREFIX}jpg
⌠⅏⌡➟ ${PREFIX}menu
⌠⅏⌡➟ ${PREFIX}om
⌠⅏⌡➟ ${PREFIX}music
⌠⅏⌡➟ ${PREFIX}video
⌠⅏⌡➟ ${PREFIX}sticker 
⌠⅏⌡➟ ${PREFIX}img

╰━─━─━─≪       👻       ≫─━─━─━╯`;
};
