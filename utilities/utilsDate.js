"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mois = exports.UtilDate = void 0;
class UtilDate {
    static parseDate(params) {
        if (params === null || params === undefined) {
            return undefined;
        }
        const tabParts = params.split("T");
        return new Date(tabParts[0]);
    }
    static differenceDay(date1, date2) {
        let difference = date1.getTime() - date2.getTime();
        difference = Math.abs(difference);
        difference = Math.ceil(difference / (1000 * 3600 * 24));
        if (difference === 0) {
            difference = difference + 1;
        }
        return difference;
    }
    static getDatesInRange(date1, date2) {
        let d1 = new Date(date1);
        let d2 = new Date(date2);
        let date = new Date(d1.getTime());
        let dates = [];
        d2.setDate(d2.getDate() + 1);
        while (date <= new Date(d2.getTime())) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
}
exports.UtilDate = UtilDate;
exports.mois = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Déc"
];
//# sourceMappingURL=utilsDate.js.map