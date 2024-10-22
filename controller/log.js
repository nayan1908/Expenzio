const Log = require("../models/log");

exports.apiLogger = (req, res, next) => {
    const start = process.hrtime();
console.log({url : req.url})
    res.on("finish", async () => {
        const end = process.hrtime(start);
        const executionTime = (end[0] * 1000) + (end[1] / 1000000) // Convert to milliseconds
        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        console.log(url)
        try {
            const logData = new Log({
                headers: req.headers || {},
                api_code: url || "",
                request: req.body || {},
                response: res.locals.response || {},
                process_time: executionTime
            });

            await logData.save();
        } catch (err) {
            console.log("log error : ", err);
        }
    });

    next();
}