var PS = PS || {};
PS.SlamData_Browser = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Either = PS.Data_Either;
    var SlamData = PS.SlamData;
    var main = (function () {
        var search$prime = SlamData_Helpers.search(SlamData_Helpers.location(SlamData_Helpers.window));
        var rawQueries = Text_Parsing_Parser.runParser(search$prime)(SlamData_Helpers.parseQueryString);
        var server = Data_Either.either(Prelude["const"](SlamData_Helpers.defaultSDConfig))(SlamData_Helpers.query2SDConfig)(rawQueries);
        return SlamData.slamData(server);
    })();
    return {
        main: main
    };
})();
PS.SlamData_Browser.main();
