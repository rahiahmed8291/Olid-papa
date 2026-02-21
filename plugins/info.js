const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad 𝐑𝐚𝐡𝐢',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },
  start: async ({ event, api, message }) => {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `${i + 1}. @${id.split('@')[0]}`)
              .join('\n')
          : 'No admins found.';

      const infoMessage = `
--------------------------------------------
➥ 𝐇𝐞𝐲 𝐌𝐫/𝐦𝐢𝐬𝐬 
╭────《  ᴍʏ ꜱᴇʟꜰ 》────⊷
│ ╭────────✧❁✧────────◆
│ │ 🌸 ɴᴀᴍᴇ :- 『 𝐀𝐋𝐕𝐈 𝐎𝐋𝐈𝐃 』
│ │ 🏡 ғʀᴏᴍ :- 『  𝐒𝐘𝐋𝐇𝐄𝐓 』
│ │ 📘 ᴄʟᴀꜱs :- 『 𝐇𝐒𝐂 𝐂𝐀𝐍𝐃𝐈𝐃𝐀𝐓𝐄 』
│ │ 💖 ʀʟs :- 『 𝐒𝐈𝐍𝐆𝐋𝐄 𝐔𝐋𝐓𝐀 𝐏𝐑𝐎 𝐌𝐀𝐗 』
│ │ 🎯 ʜᴏʙʙʏ :- 『 𝐑𝐈𝐃𝐄 』
│ │ ☎️ ɴᴜᴍʙᴇʀ :- 『 01710355871 』
│ │ ..𝐘𝐎𝐔 𝐂𝐀𝐍 𝐒𝐄𝐄 𝐌𝐘 𝐒𝐓𝐀𝐓𝐔𝐒..
│ ╰────────✧❁✧────────◆
╰══════════════════════════⊷
--------------------------------------------
--------------------------------------------

--------------------------------------------
\`\`\`
🖥️ Server Info:
• Platform       : ${os.platform()}
• CPU            : ${os.cpus()[0].model}
• Node.js Version: ${process.version}
• Uptime         : ${uptime}
• Total Memory   : ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
• Free Memory    : ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
\`\`\``;

      await api.sendMessage(
            event.threadId,
            { image: { url: "https://i.postimg.cc/3JTXcmPK/IMG-20260222-WA0004.jpg" }, caption: infoMessage || '' },
            { quoted: event.message }
          );;
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching info.', { quoted: event.message });
    }
  },
};
