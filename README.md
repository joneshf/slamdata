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

[base-dir]: http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html
[releases]: https://github.com/slamdata/slamdata/releases/latest
[SlamData]: http://slamdata.com/
[SlamEngine]: https://github.com/slamdata/slamengine
[SlamEngine-Config-Documentation]: https://github.com/slamdata/slamengine#configure
