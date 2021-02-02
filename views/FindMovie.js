const axios = require("axios");
const result = require("./Result");
const WeatherResult = require("./WeatherResult");
const { bot } = require("../index");

const FindMovie = async (msg, userData, url) =>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "_Looking for_ " + "... " + userData);
    
    try {
        await axios.get(url).then((res) =>{
            if (res.data.Response === "False") {
                bot.sendMessage(chatId, `there is no " "${ userData }" " 🎃🎃😒 `);
            } else {
                let test = result(res.data);
                bot.sendPhoto(chatId, res.data.Poster, { caption: test });
            }
        });
    } catch (err) {
        console.log(err)
    }
};

exports.FindMovie = FindMovie;

const GetCurrentWeather = async (api, id) =>{
    try {
        await axios.get(api).then(res =>{
            if (res.data.cod === 200) {
                const { lon, lat } = res.data.coord;
                let result = WeatherResult(res.data);
                bot.sendLocation(id, lat, lon);
                bot.sendMessage(id, result);
            };
        });
    } catch (err) {
        console.log(err);
    };
};

exports.GetCurrentWeather = GetCurrentWeather;
