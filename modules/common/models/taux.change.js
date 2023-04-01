"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TauxChangeModel = void 0;
class TauxChangeModel {
    static fromEntity(snapshot) {
        let obj = new TauxChangeModel();
        obj.code = snapshot.code;
        obj.taux = snapshot.taux;
        obj.fkDeviseOrigine = snapshot.fkDeviseOrigine;
        obj.deviseOrigine = snapshot.deviseOrigine;
        obj.fkDeviseDestination = snapshot.fkDeviseDestination;
        obj.deviseDestination = snapshot.deviseDestination;
        obj.dateCreate = snapshot.dateCreate;
        obj.status = snapshot.status;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        return obj;
    }
}
exports.TauxChangeModel = TauxChangeModel;
//# sourceMappingURL=taux.change.js.map