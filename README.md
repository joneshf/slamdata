# SlamData
#### Open source NoSQL analytics

[![Build Status](https://travis-ci.org/slamdata/slamdata.svg?branch=master)](https://travis-ci.org/slamdata/slamdata)
[![Stories in Ready](https://badge.waffle.io/slamdata/slamdata.png?label=ready&title=Ready)](https://waffle.io/slamdata/slamdata)

The front-end for [SlamEngine][SlamEngine].

**Table of Contents**

* [Installation](#installation)
* [Configuration](#configuration)
    * [Directories](#config-directory)
    * [SlamData](#slamdata-config)
    * [SlamEngine](#slamengine-config)
* [Development](#development)

## Installation

The easiest way to get started with SlamData is to download the pre-built installers from [SlamData][SlamData].

If you are looking for a smaller footprint and don't mind a bit more set up work, the latest pre-built node-webkit version is available in the [releases][releases].
To use the releases version, you will need to set up two config files: one for [SlamEngine](#slamengine-config) and one for [SlamData](#slamdata-config).

## Configuration

#### Config Directory

In order for this configurations to take effect, they **MUST** be saved in platform specific locations with the names `slamdata-config.json` and `slamengine-config.json` for the SlamData and SlamEngine configurations, respectively.

###### Linux

If you're set up with [XDG Base Directory][base-dir]: `$XDG_CONFIG_HOME/slamdata`

If not: `$HOME/.config/slamdata`.

###### OSX

`$HOME/Library/Application Support/slamdata`

###### Windows

`%LOCALAPPDATA%\slamdata` (this is usually `C:\Users\<your user name>\AppData\Local\slamdata`)

#### SlamData Config

The SlamData configuration is a JSON file with a couple of required fields.
Everything else is ignored.

###### nodeWebkit
###### {java :: String}

The field `nodeWebkit` is a JSON object with one field: `java`.
This should be absolute string path to a java 7 binary.

[SlamEngine][SlamEngine] requires java 7 in order to run properly.
A jre version is included in the pre-built installers and the releases as a convenience.

E.g. `/usr/bin/java`, `C:\Program Files (x86)\java\bin\java.exe`, or using the pre-built windows installer `C:\Program Files (x86)\slamdata-0.1.0\jre\bin\java.exe`.

###### server
###### {location :: String, port :: Number}

The field `server` is a JSON object with two fields: `location` and `port`.
This should point to the location of [SlamEngine][SlamEngine] you'd like to connect to.

If you're running this locally, you'll probably want these to be `http://localhost` and `8080` for `server` and `port` respectively.

An example configuration is shown below:

```json
{
  "nodeWebkit": {
    "java": "/usr/bin/java"
  },
  "server": {
    "location": "http://localhost",
    "port": 8080
  }
}
```

#### SlamEngine Config

Please see the documentation for this config file [here][SlamEngine-Config-Documentation]

## Development

We use a few tools to develop SlamData.
The main source code is written with [PureScript](PureScript), which is an altjs language, so it compiles to JavaScript.
Most of the dependencies are resolved with Bower (though some still require npm).
The native client uses node-webkit in order to provide a standalone version of SlamData.

In order to develop you'll need to install some things first:

1. [Node.js](Node.js) Any way you can install this is fine, you we only develop on version 10.x.
1. [Bower](Bower) After you have node installed and can run `npm` from the terminal, this can be installed with [`npm install -g bower`](bower-install).
1. [Gulp](Gulp) We use gulp as our main task runner. After node is installed, this can be installed with [`npm install -g gulp`](gulp-install).
1. [PureScript](PureScript) If you're on a 64-bit version of linux, you can most likely use the releases available [here](purescript-releases). Otherwise, you'll have to build it from source. For more information, please see [purescript-installing](purescript-installing).
1. [Wine](Wine) We use wine for specifically one reason, in order to replace the windows icon for the node-webkit version. It's an unfortunate dependency, but there doesn't seem to be any way around it. This should be available in most linux repos or installation instructions can be found [here](wine-install-linux). For OSX see these instructions [here](wine-install-osx) N.B. [Wine](Wine) is only necessary if you're developing on windows or you want to build the node webkit version for windows.
1. Once everything is installed, verify the tests pass with `npm test`. Assuming the tests all pass you're ready to start developing.

[base-dir]: http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html
[Bower]: http://bower.io
[bower-install]: http://bower.io/#install-bower
[Gulp]: http://gulpjs.com
[gulp-install]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#1-install-gulp-globally
[releases]: https://github.com/slamdata/slamdata/releases/latest
[Node.js]: http://nodejs.org
[PureScript]: http://www.purescript.org
[purescript-installing]: http://www.purescript.org/posts/First-Steps/#installing-the-compiler
[purescript-releases]: https://github.com/purescript/purescript/releases/
[SlamData]: http://slamdata.com/
[SlamEngine]: https://github.com/slamdata/slamengine
[SlamEngine-Config-Documentation]: https://github.com/slamdata/slamengine#configure
[Wine]: https://www.winehq.org/
[wine-install-linux]: https://www.winehq.org/download/
[wine-install-osx]: http://wiki.winehq.org/MacOSX#head-3d76f40e89a1da813fa976a4d4b3234d1a77a1c4
