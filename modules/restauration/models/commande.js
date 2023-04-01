"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandeModel = void 0;
class CommandeModel {
    constructor() {
        this.details = [];
    }
    static fromEntity(snapshot) {
        const obj = new CommandeModel;
        obj.code = snapshot.code;
        obj.montant_total = Number(snapshot.montant_total);
        obj.dateCreate = snapshot.dateCreate;
        obj.dateEdit = snapshot.dateEdit;
        obj.status = snapshot.status;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        !snapshot.details ? obj.details = [] : obj.details = snapshot.details;
        obj.etat = snapshot.etat;
        obj.bonDeDecaissement = snapshot.bonDeDecaissement;
        obj.ordreDeDecaissement = snapshot.ordreDeDecaissement;
        obj.isAuberge = snapshot.isAuberge;
        obj.isTerasse = snapshot.isTerasse;
        return obj;
    }
}
exports.CommandeModel = CommandeModel;
//# sourceMappingURL=commande.js.map