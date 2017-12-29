var _level = 0;

const log = function (level, reference, text, ...args) {
    console.log("[" + level + "][" + new Date().toISOString() + "] " + reference + ": " + text, ...args);
}

class Logger {

    static get LEVEL() {
        return {
            SILENT: 0,
            ERROR: 1,
            INFO: 2,
            DEBUG: 3
        }
    }

    constructor(reference) {
        this.reference = reference;
    }

    static set level(level) {
        _level = level;
    }

    error(text, ...args) {
        if (_level >= Logger.LEVEL.ERROR) log("ERROR", this.reference, text, ...args);
    }

    info(text, ...args) {
        if (_level >= Logger.LEVEL.INFO) log("INFO", this.reference, text, ...args);
    }

    debug(text, ...args) {
        if (_level >= Logger.LEVEL.DEBUG) log("DEBUG", this.reference, text, ...args);
    }
}

module.exports = Logger;