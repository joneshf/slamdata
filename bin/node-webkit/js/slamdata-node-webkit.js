var PS = PS || {};
PS.SlamData_NodeWebkit = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Function = PS.Data_Function;
    var Data_Map = PS.Data_Map;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Types = PS.SlamData_Types;
    var Data_Argonaut_Parser = PS.Data_Argonaut_Parser;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Data_Const = PS.Data_Const;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Debug_Trace = PS.Debug_Trace;
    var Control_Apply = PS.Control_Apply;
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var SlamData = PS.SlamData;
    var Data_Argonaut_Printer = PS.Data_Argonaut_Printer;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Control_Monad = PS.Control_Monad;
    function EventEmitter() {

    };
    function Variadic() {

    };
    var child_process = require('child_process');;
    var fs = require('fs');;
    var gui = require('nw.gui');;
    var path = require('path');;
    var platform = process.platform;;
    function writeFileSync(path) {  return function(data) {    return function() {      fs.writeFileSync(path, data);    }  }};
    function replaceState(state) {  return function(title) {    return function(url) {      return function() {        window.history.replaceState(state, title, url);      }    }  }};
    function unsafeEnv(nothing) {  return function(just) {    return function(key) {      var val = process.env[key];      return val === null || val === undefined ? nothing : just(val);    }  }};
    function spawn(proc) {  return function(args) {    return function() {      return child_process.spawn(proc, args);    }  }};
    function joinPath(paths) {  return path.join.apply(null, paths);};
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
    function rawMountings2Mountings(raw) {  var mountings = mEmpty_;  for (var path in raw) {    mountings = mInsert(path)(raw[path])(mountings);  }  return mountings;};
    var $less$div$greater = function (fp) {
        return function (fp$prime) {
            return joinPath([ fp, fp$prime ]);
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
    var seJar = $less$div$greater("jar")("slamengine_2.10-0.1-SNAPSHOT-one-jar.jar");
    var onData = function (__dict_EventEmitter_0) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(onEvent(__dict_EventEmitter_0)(variadicFn1({}))("data"))(Data_Function.mkFn1);
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
    var resolveConfigDir = (function (_4) {
        if (_4 === "darwin") {
            return $less$div$greater($less$div$greater($less$div$greater(Data_Maybe_Unsafe.fromJust(env("HOME")))("Library"))("Application Support"))("slamdata");
        };
        if (_4 === "linux") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(linuxConfigHome))("slamdata");
        };
        if (_4 === "win32") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(env("LOCALAPPDATA")))("slamdata");
        };
        throw new Error("Failed pattern match");
    })(platform);
    var sdConfigFile = $less$div$greater(resolveConfigDir)("slamdata-config.json");
    var seConfigFile = $less$div$greater(resolveConfigDir)("slamengine-config.json");
    var _sdConfig = function (__dict_Functor_1) {
        return Control_Lens.lens(function (_2) {
            return _2;
        })(function (_) {
            return function (config) {
                return config;
            };
        })(__dict_Functor_1);
    };
    var main = (function () {
        var sdConfigStr = stringify(requireConfig(sdConfigFile));
        var sdConfigM = Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Parser.parseMaybe(Data_Argonaut_Parser.parserIdParseResultString({}))(sdConfigStr))(Data_Argonaut_Decode.decodeMaybe(SlamData_Types.decodeSDConfig({})));
        var sdConfig = Data_Maybe.maybe(SlamData_Helpers.defaultSDConfig)(function (w) {
            return Control_Lens["^."](w)(_sdConfig(Data_Const.functorConst({})));
        })(sdConfigM);
        var seConfig = requireConfig(seConfigFile);
        var java = Data_Maybe.maybe("java")(Prelude.id(Prelude.categoryArr({})))(sdConfig.nodeWebkit.java);
        return function __do() {
            var _1 = spawn(java)([ "-jar", seJar, seConfigFile ])();
            onData(eventEmitterStreamStdout({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Debug_Trace.trace)(Prelude["<>"](Prelude.semigroupString({}))("stdout: ")))(stdout(_1))();
            onData(eventEmitterStreamStderr({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Debug_Trace.trace)(Prelude["<>"](Prelude.semigroupString({}))("stderr: ")))(stderr(_1))();
            var _0 = guiWindow(gui)();
            onNewWinPolicy(function (_) {
                return function (url) {
                    return function (policy) {
                        return Control_Apply["*>"](Control_Monad_Eff.applyEff({}))(Prelude[">>="](Control_Monad_Eff.bindEff({}))(guiShell(gui))(openExternal(url)))(ignore(policy));
                    };
                };
            })(_0)();
            onCloseNWWindow(function (_) {
                return Control_Apply["*>"](Control_Monad_Eff.applyEff({}))(Control_Apply["*>"](Control_Monad_Eff.applyEff({}))(kill(_1))(closeWindow(_0)))(Debug_Trace.trace("gone"));
            })(_0)();
            return Control_Monad_Cont_Trans.runContT(SlamData.slamData({
                sdConfig: sdConfig, 
                seConfig: new Data_Maybe.Just({
                    server: {
                        port: seConfig.server.port
                    }, 
                    mountings: rawMountings2Mountings(seConfig.mountings)
                })
            }))(function (_3) {
                return function __do() {
                    writeFileSync(sdConfigFile)(Data_Argonaut_Printer.printToString(Data_Argonaut_Encode.encodeIdentity(SlamData_Types.encodeSDConfig({}))(_3.sdConfig)))();
                    return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Maybe.isJust(_3.seConfig))(writeFileSync(seConfigFile)(stringify(Data_Maybe_Unsafe.fromJust(_3.seConfig))))();
                };
            })();
        };
    })();
    return {
        Variadic: Variadic, 
        EventEmitter: EventEmitter, 
        main: main, 
        seJar: seJar, 
        seConfigFile: seConfigFile, 
        sdConfigFile: sdConfigFile, 
        resolveConfigDir: resolveConfigDir, 
        linuxConfigHome: linuxConfigHome, 
        _sdConfig: _sdConfig, 
        rawMountings2Mountings: rawMountings2Mountings, 
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
        joinPath: joinPath, 
        spawn: spawn, 
        env: env, 
        unsafeEnv: unsafeEnv, 
        replaceState: replaceState, 
        writeFileSync: writeFileSync, 
        windowHistory: windowHistory, 
        window: window, 
        process: process, 
        platform: platform, 
        path: path, 
        gui: gui, 
        fs: fs, 
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
