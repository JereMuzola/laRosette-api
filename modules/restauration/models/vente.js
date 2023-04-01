"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenteModel = void 0;
class VenteModel {
    static fromEntity(snapshot) {
        let obj = new VenteModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.typeVente = snapshot.typeVente;
        obj.client = snapshot.client;
        obj.fkClient = snapshot.fkClient;
        obj.fkTable = snapshot.fkTable;
        obj.designation_table = snapshot.designation_table;
        obj.nombre_personne = Number(snapshot.nombre_personne);
        obj.montant_total = Number(snapshot.montant_total);
        obj.agence = snapshot.agence;
        obj.agent = snapshot.agent;
        obj.fkAgence = snapshot.fkAgence;
        !snapshot.details ? obj.details = [] : obj.details = snapshot.details;
        obj.fkAgent = snapshot.fkAgent;
        obj.status = snapshot.status;
        obj.isPaid = snapshot.isPaid;
        obj.venteService = snapshot.venteService;
        !snapshot.facture ? obj.facture = null : obj.facture = snapshot.facture;
        return obj;
    }
}
exports.VenteModel = VenteModel;
//# sourceMappingURL=vente.js.map