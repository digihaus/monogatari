var _level = 0;

const log = function (level, reference, message) {
    console.log("[" + level + "][" + new Date().toISOString() + "]", reference, message);
}

class LoggerClass {

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

    error(message) {
        if (_level >= LoggerClass.LEVEL.ERROR) log("ERROR", this.reference, message);
    }

    info(message) {
        if (_level >= LoggerClass.LEVEL.INFO) log("INFO", this.reference, message);
    }

    debug(message) {
        if (_level >= LoggerClass.LEVEL.DEBUG) log("DEBUG", this.reference, message);
    }
}

const Logger = function () {
    function instance(reference) {
        return new LoggerClass(reference);
    }
}

module.exports = Logger;