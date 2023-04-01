"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchatModel = void 0;
class AchatModel {
    constructor() {
        this.details = [];
    }
    static fromEntity(snapshot) {
        const obj = new AchatModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.dateEdit = snapshot.dateEdit;
        obj.etat = snapshot.etat;
        obj.montant_total = Number(snapshot.montant_total);
        obj.status = snapshot.status;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        obj.fkBonDecaissement = snapshot.fkBonDecaissement;
        obj.fkCommande = snapshot.fkCommande;
        !snapshot.details ? obj.details = [] : obj.details = snapshot.details;
        return obj;
    }
}
exports.AchatModel = AchatModel;
//# sourceMappingURL=achat.js.map