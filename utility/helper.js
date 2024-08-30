const moment = require("moment");

exports.getSysDateFormat = (date, format = "Y-m-d") => {
    if(date){
        return moment(date).format(format);
    }

    return "";
}