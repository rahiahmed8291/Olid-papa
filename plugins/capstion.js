const axios = require("axios");

module.exports = {
  config: {
    name: "capstion",
    aliases: ["sim"],
    permission: 0,
    prefix: "both",
    categorie: "AI Chat",
    cooldowns: 5,
    credit: "Developed by Mohammad Nayan",
    usages: [
      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
    ],
    description: "Engage in conversations with an AI-powered bot!",
  },

  start: async function ({ api, event, args }) {
    const { threadId, message, senderId } = event;
    const usermsg = args.join(" ");

    
    if (!usermsg) {
      const greetings = [
  "সরেন তো..!!😡🔪 Bow খুজতাছি...!! ᥬ🙂ᩤ 👀",
  "— মানুষ হইয়া ফাইসা গেছি, পাখি হলে উইড়া যাইতাম..!! 😅🌼",
  `ছেলেটা আজও ডিম খেতে গিয়ে কেঁদে ফেলে..কারণ মেয়েটার নাম ছিলো মিম..🙂🤌!¡`",
  "*🔥 আমি ভালো না, তবে যে যেমন—তাকে তেমনই জবাব দিই!👿🤘*",
  "You Know what..?🌸✨*—মানুষ ঠিক শুরুর মতো থাকেনা.!!🕊️*",
  "বরযাত্রী যাওয়া প্রতিটা লোক মেয়ে পক্ষের বাড়ি পৌঁছানোর পর নিজেকে Celebrity মনে করে! 🫩",
  "_Lipstick এর গ্যারান্টি দিতে পারবো না কিন্তু...🥹💗__তোমার চোখের কাজল কখনো নষ্ট হতে দিবো না প্রিয়..😩🫀Bujhso prio🕊️❤️‍🩹`",
  "হুম জান বলো আমি তোমার লাগি কি করতে পারি বলো 😗",
  
];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${senderId.split('@')[0]}, ${randomGreeting}`,
        mentions: [senderId],
      }, { quoted: message });

      
      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: greetingMessage.key.id,
        type: "chat"
      });

      return;
    }

    
    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Bot command error:", err);
      return api.sendMessage(threadId, { text: "❌ Something went wrong while talking with bot." }, { quoted: message });
    }
  },


  handleReply: async function ({ api, event, handleReply }) {
    
    const { threadId, message, body, senderId } = event;

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Error in bot handleReply:", err);
      return api.sendMessage(threadId, { text: "❌ Failed to continue conversation." }, { quoted: message });
    }
  }
};
