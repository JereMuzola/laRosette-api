"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableModel = void 0;
class TableModel {
    static fromEntity(snapshot) {
        let obj = new TableModel();
        obj.code = snapshot.code;
        obj.designation = snapshot.designation;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        obj.agence = snapshot.agence;
        obj.fkAgence = snapshot.fkAgence;
        return obj;
    }
}
exports.TableModel = TableModel;
//# sourceMappingURL=table.js.map