"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factureRestaurentModel = void 0;
class factureRestaurentModel {
    static fromEntity(snapshot) {
        const obj = new factureRestaurentModel();
        obj.code = snapshot.code;
        obj.montantHorsTaxe = snapshot.montantHorsTaxe;
        obj.tva = snapshot.tva;
        obj.montantTTC = snapshot.montantTTC;
        obj.montantPaye = snapshot.montantPaye;
        obj.solde = snapshot.solde;
        obj.dateCreate = snapshot.dateCreate;
        obj.dateEdit = snapshot.dateEdit;
        obj.fkVente = snapshot.fkVente;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        obj.status = snapshot.status;
        obj.venteService = snapshot.venteService;
        obj.fkTaux = snapshot.fkTaux;
        obj.taux = snapshot.taux;
        return obj;
    }
}
exports.factureRestaurentModel = factureRestaurentModel;
//# sourceMappingURL=factureRestaurent.js.map