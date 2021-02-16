const TempCalculate = (temp) => {
    const Temp = parseFloat(temp);
    let Celcius = Math.round(Temp - 273.15);
    return Celcius;
};

const SunRise = (Up) => {
    let result = new Date(Up * 1000);
    return result.getHours();
};

const SunSet = (Down) => {
    let result = new Date(Down * 1000);
    return result.getHours();
};

const WeatherWeekResult = (data) => {
    let test = data.map(
        (item) =>
            "\n\nlocation : " +
            `${item.sunset.name} ` +
            "\nday : " +
            `${item.day} ` +
            "\ntemp : " +
            " " +
            TempCalculate(item.temp) +
            " *C " +
            "\nsunrise : " +
            SunRise(item.sunset.sunrise) +
            "\nsunset : " +
            SunSet(item.sunset.sunset) +
            "\ndescription : " +
            `${item.description}`
    );
    return `${test}`;
};

module.exports = WeatherWeekResult;
