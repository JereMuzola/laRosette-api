"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureModel = void 0;
class FactureModel {
    constructor() {
        this.details = [];
    }
    static fromEntity(snapshot) {
        const obj = new FactureModel();
        obj.code = snapshot.code;
        obj.clientResponsable = snapshot.clientResponsable;
        obj.fkClientResponsable = snapshot.fkClientResponsable;
        obj.fkOccupation = snapshot.fkOccupation;
        obj.deteCreate = snapshot.deteCreate;
        obj.dateEdit = snapshot.dateEdit;
        obj.status = snapshot.status;
        obj.isPaid = snapshot.isPaid;
        obj.montantAPayer = snapshot.montantAPayer;
        obj.montantPaye = snapshot.montantPaye;
        obj.solde = snapshot.solde;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        obj.fkTaux = snapshot.fkTaux;
        obj.taux = snapshot.taux;
        return obj;
    }
}
exports.FactureModel = FactureModel;
//# sourceMappingURL=facture.js.map