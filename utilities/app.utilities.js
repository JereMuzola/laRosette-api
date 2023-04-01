"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUtilities = void 0;
const value_data_exception_1 = require("./value.data.exception");
class AppUtilities {
    static uniqArray(array) {
        const result = [];
        array.forEach((item) => {
            if (!result.includes(item)) {
                result.push(item);
            }
        });
        return result;
    }
    static controlValueNumber(value, message) {
        if (value == null)
            throw new value_data_exception_1.ValueDataException(message);
        if (value != null && value <= 0)
            throw new value_data_exception_1.ValueDataException(message);
        return true;
    }
    static controlValueString(value, message) {
        if (value == null)
            throw new value_data_exception_1.ValueDataException(message);
        if (value != null && value.trim().length <= 0)
            throw new value_data_exception_1.ValueDataException(message);
        return true;
    }
    static controlValueList(value, message) {
        if (value == null)
            throw new value_data_exception_1.ValueDataException(message);
        if (value != null && value.length <= 0)
            throw new value_data_exception_1.ValueDataException(message);
        return true;
    }
    static escapeSpecialChar(s) {
        try {
            this.controlValueString(s, "Valeur nulle");
            return s.trim().replace(".", "/")
                .replace("/", "/")
                .replace("-", "/")
                .replace("*", "/")
                .replace("+", "/")
                .replace(",", "/");
        }
        catch (e) {
            console.log("escapeSpecialChar : " + e);
        }
        return "";
    }
    static convertStringToStringDate(s) {
        s = this.escapeSpecialChar(s);
        try {
            const occurrence = s.indexOf("/");
            if (occurrence > 0) {
                let dd = "", mm = "", yyyy = "";
                if (occurrence == 2) {
                    dd = s.substring(0, occurrence);
                    mm = s.substring(3, 5);
                    yyyy = s.substring(6);
                }
                else if (occurrence == 4) {
                    yyyy = s.substring(0, occurrence);
                    mm = s.substring(5, 7);
                    dd = s.substring(8);
                }
                s = yyyy + mm + dd;
            }
        }
        catch (e) {
            console.log(e);
            throw new value_data_exception_1.ValueDataException("Le format de la date n'est pas correcte.");
        }
        this.controlValueString(s, "Le format de la date n'est pas correct.");
        return s;
    }
    static convertDateToStringddMMyyyy(date) {
        let newDate = AppUtilities.convertStringToStringDate(date.toISOString().split("T")[0]);
        newDate = newDate.substring(6, 8) + "/" + newDate.substring(4, 6) + "/" + newDate.substring(0, 4);
        return newDate;
    }
    static addDays(date, days) {
        let date1 = new Date(date);
        date1.setDate(date.getDate() + days);
        return date1;
    }
}
exports.AppUtilities = AppUtilities;
//# sourceMappingURL=app.utilities.js.map