'use strict';

const config = require('../config')
const log4js = require('log4js');
const loggerConfig = config.logger

// Fallback
if (!loggerConfig.logLevel) {
  loggerConfig.logLevel = "ERROR";
}

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d] [%p] <%c> {%f{2}:%l}%] => %m',
      }

    },
    file: {
      type: 'file',
      filename: 'App.log',
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] <%c> {%f{2}:%l} => %m',
      },
    }
  },
  categories: {
    default: {
      appenders: ['stdout', 'file'],
      level: loggerConfig.logLevel,
      enableCallStack: true
    }
  }
});

module.exports = (moduleName) => {
  const logger = log4js.getLogger(moduleName);
  return logger;
};