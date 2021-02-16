process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const Commands = require("./views/commands");
exports.bot = bot;
const axios = require("axios");
const {
    GetCurrentWeather,
    FindMovie,
    GetCurrentWeekWeather,
} = require("./views/FindMovie");

bot.onText(/\/weather (.+)/, async (msg, match) => {
    const id = msg.chat.id;
    const text = match[1].trim();
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${process.env.WEATHER_API}`;
    await GetCurrentWeather(api, id);
});

bot.on("message", (msg) => {
    let help = "help";
    if (msg.text.toString().toLowerCase().indexOf(help) === 0) {
        bot.sendMessage(msg.chat.id, Commands);
    }
});

bot.on("document", async (msg) => {
    const chatId = msg.chat.id;
    const { file_id: fileId } = msg.document;
    const fileUrl = await bot.getFileLink(fileId);

    await axios.get(fileUrl).then((res) => {
        bot.sendMessage(chatId, "Added new file :\n\n" + res.data);
    });
});

bot.onText(/\/movie (.+)/, async (msg, match) => {
    if (!msg.text.includes("/weather") || !msg.text.includes("/weatherweek")) {
        if (msg.text.includes("movie")) {
            let userData = match[1].trim();
            let url = `http://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY}&t=${userData}`;
            await FindMovie(msg, userData, url);
        }
    }
});

bot.onText(/\/weatherweek (.+)/, async (msg, match) => {
    const id = msg.chat.id;
    const text = match[1].trim();
    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${process.env.WEATHER_API}`;

    await GetCurrentWeekWeather(API, id);
});
