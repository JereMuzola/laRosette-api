"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdreDeDecaissementModel = void 0;
class OrdreDeDecaissementModel {
    static fromEntity(snapshot) {
        const obj = new OrdreDeDecaissementModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkDocumentSoubassement = snapshot.fkDocumentSoubassement;
        obj.motif = snapshot.motif;
        obj.fkAgentEmitter = snapshot.fkAgentEmitter;
        obj.agentEmitter = snapshot.agentEmitter;
        obj.fkAgentReceiver = snapshot.fkAgentReceiver;
        obj.agentReceiver = snapshot.agentReceiver;
        obj.montant = Number(snapshot.montant);
        obj.agence = snapshot.agence;
        obj.fkAgence = snapshot.fkAgence;
        obj.status = snapshot.status;
        obj.lieuEmission = snapshot.lieuEmission;
        obj.isValidateByCoordon = snapshot.isValidateByCoordon;
        obj.isAuberge = snapshot.isAuberge;
        obj.isTerasse = snapshot.isTerasse;
        return obj;
    }
}
exports.OrdreDeDecaissementModel = OrdreDeDecaissementModel;
//# sourceMappingURL=ordreDeDecaissement.js.map