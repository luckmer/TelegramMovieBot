const Result = (movie) => {
    return (
        "Title: " +
        `_${movie.Title}_` +
        "\nYear: " +
        `_${movie.Year}_` +
        "\nRated: " +
        `_${movie.Rated}_` +
        "\nReleased: " +
        `_${movie.Released}_` +
        "\n" +
        "\nProduction: " +
        `_${movie.Production}_` +
        "\n" +
        "\nPlot: " +
        `_${movie.Plot}_`
    );
};

module.exports = Result;
