var appRoot = require('app-root-path');
const {
    createLogger,
    transports,
    format
} = require('winston');
// require('winston-mongodb');


const logger = createLogger({
    transports: [
        new transports.File({
            filename: `${appRoot}/logs/info.log`,
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
    ]
})
module.exports = logger;
