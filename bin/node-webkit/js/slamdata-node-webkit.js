var PS = PS || {};
PS.SlamData_NodeWebkit = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_Path = PS.Node_Path;
    var Data_Either = PS.Data_Either;
    var Debug_Trace = PS.Debug_Trace;
    var Global = PS.Global;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Function = PS.Data_Function;
    var Data_Map = PS.Data_Map;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var Data_Argonaut_Printer = PS.Data_Argonaut_Printer;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Argonaut_Parser = PS.Data_Argonaut_Parser;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var SlamData_Types = PS.SlamData_Types;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var Control_Apply = PS.Control_Apply;
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var SlamData = PS.SlamData;
    var Node_FS_Sync = PS.Node_FS_Sync;
    var Node_Encoding = PS.Node_Encoding;
    function EventEmitter() {

    };
    function Variadic() {

    };
    var child_process = require('child_process');;
    var gui = require('nw.gui');;
    var platform = process.platform;;
    function replaceState(state) {  return function(title) {    return function(url) {      return function() {        window.history.replaceState(state, title, url);      }    }  }};
    function unsafeEnv(nothing) {  return function(just) {    return function(key) {      var val = process.env[key];      return val === null || val === undefined ? nothing : just(val);    }  }};
    function spawn(proc) {  return function(args) {    return function() {      return child_process.spawn(proc, args);    }  }};
    function guiShell(gui) {  return function() {    return gui.Shell;  }};
    function guiWindow(gui) {  return function() {    return gui.Window.get();  }};
    function openExternal(url) {  return function(shell) {    return function() {      return shell.openExternal(url);    }  }};
    function showDevTools(win) {  return function() {    return win.showDevTools();  }};
    function closeWindow(win) {  return function() {    return win.close(true);  }};
    function kill(child) {  return function() {    return child.kill();  }};
    function stdout(child) {  return child.stdout;};
    function stderr(child) {  return child.stderr;};
    function windowPolicy(method) {  return function(policy) {    return function() {      return policy[method]();    }  }};
    function onEvent(__emitter) {  return function(__variadic) {    return function(event) {      return function(cb) {        return function(child) {          return function() {            return child.on(event, function () {              return cb.apply(this, arguments)();            }.bind(this));          }        }      }    }  }};
    function stringify(obj) {  return JSON.stringify(obj, null, 2);};
    function requireConfig(location) {  return require(location);};
    var $less$div$greater = function (fp) {
        return function (fp$prime) {
            return Node_Path.join([ fp, fp$prime ]);
        };
    };
    var windowHistory = window.history;
    var variadicFn3 = function (_) {
        return new Variadic();
    };
    var variadicFn2 = function (_) {
        return new Variadic();
    };
    var variadicFn1 = function (_) {
        return new Variadic();
    };
    var variadicFn0 = function (_) {
        return new Variadic();
    };
    var showError = Data_Either.either(Debug_Trace.print(Global.showError({})))(Prelude.pure(Control_Monad_Eff.applicativeEff({})));
    var seJar = $less$div$greater("jar")("slamengine_2.10-0.1-SNAPSHOT-one-jar.jar");
    var onData = function (__dict_EventEmitter_589) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(onEvent(__dict_EventEmitter_589)(variadicFn1({}))("data"))(Data_Function.mkFn1);
    };
    var mInsert = Data_Map.insert(Prelude.ordString({}));
    var mEmpty_ = Data_Map.empty;
    var ignore = windowPolicy("ignore");
    var forceNewWindow = windowPolicy("forceNewWindow");
    var forceNewPopup = windowPolicy("forceNewPopup");
    var forceDownload = windowPolicy("forceDownload");
    var forceCurrent = windowPolicy("forceCurrent");
    var eventEmitterStreamStdout = function (_) {
        return new EventEmitter();
    };
    var eventEmitterStreamStderr = function (_) {
        return new EventEmitter();
    };
    var eventEmitterNWWindow = function (_) {
        return new EventEmitter();
    };
    var onCloseNWWindow = Prelude["<<<"](Prelude.semigroupoidArr({}))(onEvent(eventEmitterNWWindow({}))(variadicFn0({}))("close"))(Data_Function.mkFn0);
    var onNewWinPolicy = Prelude["<<<"](Prelude.semigroupoidArr({}))(onEvent(eventEmitterNWWindow({}))(variadicFn3({}))("new-win-policy"))(Data_Function.mkFn3);
    var eventEmitterChildProcess = function (_) {
        return new EventEmitter();
    };
    var env = unsafeEnv(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
    var linuxConfigHome = Prelude["<|>"](Data_Maybe.alternativeMaybe({}))(env("XDG_CONFIG_HOME"))(Prelude["<$>"](Data_Maybe.functorMaybe({}))(function (home) {
        return $less$div$greater(home)(".config");
    })(env("HOME")));
    var resolveConfigDir = (function (_831) {
        if (_831 === "darwin") {
            return $less$div$greater($less$div$greater($less$div$greater(Data_Maybe_Unsafe.fromJust(env("HOME")))("Library"))("Application Support"))("slamdata");
        };
        if (_831 === "linux") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(linuxConfigHome))("slamdata");
        };
        if (_831 === "win32") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(env("LOCALAPPDATA")))("slamdata");
        };
        throw new Error("Failed pattern match");
    })(platform);
    var sdConfigFile = $less$div$greater(resolveConfigDir)("slamdata-config.json");
    var seConfigFile = $less$div$greater(resolveConfigDir)("slamengine-config.json");
    var config2String = function (__dict_EncodeJson_590) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Argonaut_Printer.printToString)(Data_Argonaut_Encode.encodeIdentity(__dict_EncodeJson_590));
    };
    var main = (function () {
        var sdConfigStr = stringify(requireConfig(sdConfigFile));
        var sdConfigM = Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Parser.parseMaybe(Data_Argonaut_Parser.parserIdParseResultString({}))(sdConfigStr))(Data_Argonaut_Decode.decodeMaybe(SlamData_Types.decodeSDConfig({})));
        var sdConfig = SlamData_Helpers.getOrElse(sdConfigM)(SlamData_Helpers.defaultSDConfig);
        var seConfigStr = stringify(requireConfig(seConfigFile));
        var seConfigM = Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Parser.parseMaybe(Data_Argonaut_Parser.parserIdParseResultString({}))(seConfigStr))(Data_Argonaut_Decode.decodeMaybe(SlamData_Types.decodeSEConfig({})));
        var seConfig = SlamData_Helpers.getOrElse(seConfigM)(SlamData_Helpers.defaultSEConfig);
        var java = Control_Lens["^."](sdConfig)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigRec(Data_Const.functorConst({})))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._nodeWebkit(Data_Const.functorConst({})))(SlamData_Lens._java(Data_Const.functorConst({})))));
        return function __do() {
            var _193 = spawn(java)([ "-jar", seJar, seConfigFile ])();
            onData(eventEmitterStreamStdout({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Debug_Trace.trace)(Prelude["<>"](Prelude.semigroupString({}))("stdout: ")))(stdout(_193))();
            var __1 = onData(eventEmitterStreamStderr({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Debug_Trace.trace)(Prelude["<>"](Prelude.semigroupString({}))("stderr: ")))(stderr(_193))();
            var _192 = guiWindow(gui)();
            var __2 = onNewWinPolicy(function (__2) {
                return function (url) {
                    return function (policy) {
                        return Control_Apply["*>"](Control_Monad_Eff.applyEff({}))(Prelude[">>="](Control_Monad_Eff.bindEff({}))(guiShell(gui))(openExternal(url)))(ignore(policy));
                    };
                };
            })(_192)();
            var __3 = onCloseNWWindow(function (__3) {
                return Control_Apply["*>"](Control_Monad_Eff.applyEff({}))(Control_Apply["*>"](Control_Monad_Eff.applyEff({}))(kill(_193))(closeWindow(_192)))(Debug_Trace.trace("gone"));
            })(_192)();
            return Control_Monad_Cont_Trans.runContT(SlamData.slamData({
                sdConfig: sdConfig, 
                seConfig: seConfig
            }))(function (_830) {
                return function __do() {
                    var __4 = Prelude[">>="](Control_Monad_Eff.bindEff({}))(Node_FS_Sync.writeTextFile(Node_Encoding.UTF8.value)(sdConfigFile)(config2String(SlamData_Types.encodeSDConfig({}))(_830.sdConfig)))(showError)();
                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Node_FS_Sync.writeTextFile(Node_Encoding.UTF8.value)(seConfigFile)(config2String(SlamData_Types.encodeSEConfig({}))(_830.seConfig)))(showError)();
                };
            })();
        };
    })();
    return {
        Variadic: Variadic, 
        EventEmitter: EventEmitter, 
        main: main, 
        showError: showError, 
        config2String: config2String, 
        seJar: seJar, 
        seConfigFile: seConfigFile, 
        sdConfigFile: sdConfigFile, 
        resolveConfigDir: resolveConfigDir, 
        linuxConfigHome: linuxConfigHome, 
        requireConfig: requireConfig, 
        stringify: stringify, 
        mInsert: mInsert, 
        mEmpty_: mEmpty_, 
        onNewWinPolicy: onNewWinPolicy, 
        onCloseNWWindow: onCloseNWWindow, 
        onData: onData, 
        onEvent: onEvent, 
        forceNewPopup: forceNewPopup, 
        forceNewWindow: forceNewWindow, 
        forceDownload: forceDownload, 
        forceCurrent: forceCurrent, 
        ignore: ignore, 
        windowPolicy: windowPolicy, 
        stderr: stderr, 
        stdout: stdout, 
        kill: kill, 
        closeWindow: closeWindow, 
        showDevTools: showDevTools, 
        openExternal: openExternal, 
        guiWindow: guiWindow, 
        guiShell: guiShell, 
        "</>": $less$div$greater, 
        spawn: spawn, 
        env: env, 
        unsafeEnv: unsafeEnv, 
        replaceState: replaceState, 
        windowHistory: windowHistory, 
        window: window, 
        platform: platform, 
        gui: gui, 
        child_process: child_process, 
        eventEmitterChildProcess: eventEmitterChildProcess, 
        eventEmitterNWWindow: eventEmitterNWWindow, 
        eventEmitterStreamStdout: eventEmitterStreamStdout, 
        eventEmitterStreamStderr: eventEmitterStreamStderr, 
        variadicFn0: variadicFn0, 
        variadicFn1: variadicFn1, 
        variadicFn2: variadicFn2, 
        variadicFn3: variadicFn3
    };
})();
PS.SlamData_NodeWebkit.main();
