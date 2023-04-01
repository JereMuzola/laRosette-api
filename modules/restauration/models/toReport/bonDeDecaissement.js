"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonDeDecaissementModel = void 0;
class BonDeDecaissementModel {
    static fromEntity(snapshot) {
        const obj = new BonDeDecaissementModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkDocSoubassement = snapshot.fkDocSoubassement;
        obj.motif = snapshot.motif;
        obj.etat = snapshot.etat;
        obj.fkAgent = snapshot.fkAgent;
        obj.agence = snapshot.agence;
        obj.fkAgence = snapshot.fkAgence;
        obj.agent = snapshot.agent;
        obj.montant = Number(snapshot.montant);
        obj.status = snapshot.status;
        obj.fkOrdre = snapshot.fkOrdre;
        obj.isAuberge = snapshot.isAuberge;
        obj.isTerasse = snapshot.isTerasse;
        return obj;
    }
}
exports.BonDeDecaissementModel = BonDeDecaissementModel;
//# sourceMappingURL=bonDeDecaissement.js.map