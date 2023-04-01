"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerConfig = void 0;
const winston = require("winston");
const path_1 = require("path");
const fs_1 = require("fs");
class LoggerConfig {
    constructor() {
        this.dirPathRoot = './../../logs/';
        this.dirPathDebug = this.dirPathRoot + 'debug.log';
        this.dirPathError = this.dirPathRoot + 'error.log';
        this.dirPathInfo = this.dirPathRoot + 'info.log';
        this.options = {
            exitOnError: false,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.File({
                    dirname: (0, path_1.join)(__dirname, this.dirPathRoot),
                    filename: 'debug.log',
                    level: 'debug',
                }),
                new winston.transports.File({
                    dirname: (0, path_1.join)(__dirname, this.dirPathRoot),
                    filename: 'info.log',
                    level: 'info',
                }),
                new winston.transports.File({
                    dirname: (0, path_1.join)(__dirname, this.dirPathRoot),
                    filename: 'error.log',
                    level: 'error',
                }),
            ],
        };
    }
    init() {
        if (!(0, fs_1.existsSync)(this.dirPathRoot)) {
            (0, fs_1.mkdirSync)(this.dirPathRoot, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(this.dirPathDebug)) {
            (0, fs_1.mkdirSync)(this.dirPathDebug, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(this.dirPathError)) {
            (0, fs_1.mkdirSync)(this.dirPathError, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(this.dirPathInfo)) {
            (0, fs_1.mkdirSync)(this.dirPathInfo, { recursive: true });
        }
    }
    start() {
        this.init();
        return this.options;
    }
}
exports.LoggerConfig = LoggerConfig;
//# sourceMappingURL=loggerConfig.js.map