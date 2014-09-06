'use strict'

function resolveNWBinary() {
    if (process.platform === 'linux') {
        return 'dist/SlamData/linux64/SlamData';
    } else if (process.platform === 'darwin') {
        return 'dist/SlamData/osx/SlamData.app/Contents/MacOS/node-webkit';
    } else {
        return 'dist/SlamData/win/SlamData.exe';
    }
}

module.exports = {resolveNWBinary: resolveNWBinary}
