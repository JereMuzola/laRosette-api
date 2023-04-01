"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviseModel = void 0;
class DeviseModel {
    static fromEntity(snapshot) {
        let obj = new DeviseModel();
        obj.code = snapshot.code;
        obj.description = snapshot.description;
        obj.symbole = snapshot.symbole;
        obj.dateCreate = snapshot.dateCreate;
        obj.status = snapshot.status;
        obj.diminutif = snapshot.diminutif;
        return obj;
    }
}
exports.DeviseModel = DeviseModel;
//# sourceMappingURL=devise.js.map