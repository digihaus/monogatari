var _level = 0;

const log = function(level, reference, message) {
    console.log("[" + level + "][" + new Date().toISOString + "]" + this.reference, message);
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
        if (_level >= LoggerClass.LEVEL.ERROR) {

            log("ERROR", this.reference, message);

            console.log("[ERROR][" + new Date().toISOString + "]" + this.reference, message);
        }
    }

    info(message) {
        if (_level >= LoggerClass.LEVEL.INFO) console.log(this.reference, message);
    }

    debug(message) {
        if (_level >= LoggerClass.LEVEL.DEBUG) console.log(this.reference, message);
    }
}

const Logger = function () {
    function instance(clazz) {
        return new LoggerClass(clazz);
    }
}

module.exports = Logger;