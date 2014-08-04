var PS = PS || {};
PS.SlamData_Browser = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Either = PS.Data_Either;
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var SlamData = PS.SlamData;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var main = (function () {
        var search$prime = SlamData_Helpers.search(SlamData_Helpers.location(SlamData_Helpers.window));
        var rawQueries = Text_Parsing_Parser.runParser(search$prime)(SlamData_Helpers.parseQueryString);
        var sdConfig = Data_Either.either(Prelude["const"](SlamData_Helpers.defaultSDConfig))(SlamData_Helpers.query2SDConfig)(rawQueries);
        var seConfig = Data_Either.either(Prelude["const"](SlamData_Helpers.defaultSEConfig))(SlamData_Helpers.query2SEConfig)(rawQueries);
        return Control_Monad_Cont_Trans.runContT(SlamData.slamData({
            sdConfig: sdConfig, 
            seConfig: seConfig
        }))(function (_) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude.unit);
        });
    })();
    return {
        main: main
    };
})();
PS.SlamData_Browser.main();
