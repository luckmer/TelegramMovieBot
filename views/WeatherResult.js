const WeatherResult = (data) => {
    //celcius
    let test = parseFloat(data.main.temp);
    let Celcius;
    Celcius = Math.floor(test - 273.15);

    //wind speed
    let { speed } = data.wind;
    let WindSpeed;
    WindSpeed = Math.round(0.836 * Math.sqrt(Math.pow(speed, 3)) * 100) / 100;

    //visibility
    let { visibility } = data;
    let Visibility;
    Visibility = Math.floor(visibility / 1000);

    const { humidity } = data.main;
    return (
        "Current Temperature : " +
        `${Celcius} ` +
        " *C " +
        "\nWind Speed : " +
        ` ${WindSpeed} ` +
        "\nhumidity : " +
        ` ${humidity} ` +
        "\nVisibility : " +
        ` ${Visibility} `
    );
};

module.exports = WeatherResult;
