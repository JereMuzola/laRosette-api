"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementModel = void 0;
class PaiementModel {
    static fromEntity(snapshot) {
        const obj = new PaiementModel();
        obj.id = snapshot.id;
        obj.numTransaction = snapshot.numTransaction;
        obj.libelle = snapshot.libelle;
        obj.transactionDate = snapshot.transactionDate;
        obj.status = snapshot.status;
        obj.transactionMontant = snapshot.transactionMontant;
        obj.transactionDevise = snapshot.transactionDevise;
        obj.montantConverti = snapshot.montantConverti;
        obj.deviseConversion = snapshot.deviseConversion;
        obj.typePaiement = snapshot.typePaiement;
        obj.taux = snapshot.taux;
        obj.fkAgent = snapshot.fkAgent;
        obj.fkFacture = snapshot.fkFacture;
        obj.fkCompte = snapshot.fkCompte;
        obj.fkTransactionCentre = snapshot.fkTransactionCentre;
        return obj;
    }
}
exports.PaiementModel = PaiementModel;
//# sourceMappingURL=paiement.js.map