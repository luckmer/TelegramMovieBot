const axios = require("axios");
const result = require("./Result");
const WeatherResult = require("./WeatherResult");
const WeatherWeekResult = require("./WeatherWeekResult");
const { bot } = require("../index");

const FindMovie = async (msg, userData, url) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "_Looking for_ " + "... " + userData);

    try {
        await axios.get(url).then((res) => {
            if (res.data.Response === "False") {
                bot.sendMessage(
                    chatId,
                    `there is no " "${userData}" " 🎃🎃😒 `
                );
            } else {
                let test = result(res.data);
                bot.sendPhoto(chatId, res.data.Poster, { caption: test });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.FindMovie = FindMovie;

const GetCurrentWeather = async (api, id) => {
    try {
        await axios.get(api).then((res) => {
            if (res.data.cod === 200) {
                const { lon, lat } = res.data.coord;
                let result = WeatherResult(res.data);
                bot.sendLocation(id, lat, lon);
                bot.sendMessage(id, result);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.GetCurrentWeather = GetCurrentWeather;

const GetCurrentWeekWeather = async (api, id) => {
    try {
        const resp = await axios
            .get(api)
            .then((res) => res.data)
            .catch((err) => {
                throw err;
            });
        const values = [0, 7, 15];
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let filteredData =
            resp.cod === "404" ? [] : new Date(resp.list[0].dt * 1000);
        let List = resp.code === "404" ? "" : resp.list;
        const dailyData = [];

        if (List) {
            List.map((index, val) => {
                if (values.includes(val)) {
                    const {
                        main: { temp },
                        dt_txt,
                    } = index;

                    filteredData = new Date(resp.list[val].dt * 1000);
                    let sunrise = resp.city.sunrise;
                    let sunset = resp.city;
                    let description = index.weather[0].description;
                    let day = days[filteredData.getDay()];
                    let total = {
                        ...index,
                        temp,
                        sunrise,
                        sunset,
                        day,
                        dt_txt,
                        description,
                    };
                    dailyData.push(total);
                }
            });
        }

        let result = WeatherWeekResult(dailyData);
        bot.sendMessage(id, result);
    } catch (err) {
        console.log(err);
    }
};
exports.GetCurrentWeekWeather = GetCurrentWeekWeather;
