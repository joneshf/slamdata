var PS = PS || {};
PS.SlamData_Browser = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Either = PS.Data_Either;
    var SlamData = PS.SlamData;
    var Data_Maybe = PS.Data_Maybe;
    var main = (function () {
        var search$prime = SlamData_Helpers.search(SlamData_Helpers.location(SlamData_Helpers.window));
        var rawQueries = Text_Parsing_Parser.runParser(search$prime)(SlamData_Helpers.parseQueryString);
        var sdConfig = Data_Either.either(Prelude["const"](SlamData_Helpers.defaultSDConfig))(SlamData_Helpers.query2SDConfig)(rawQueries);
        var seConfig = Data_Either.either(Prelude["const"](SlamData_Helpers.defaultSEConfig))(SlamData_Helpers.query2SEConfig)(rawQueries);
        return SlamData.slamData({
            sdConfig: sdConfig, 
            seConfig: Data_Maybe.Just(seConfig)
        });
    })();
    return {
        main: main
    };
})();
PS.SlamData_Browser.main();
