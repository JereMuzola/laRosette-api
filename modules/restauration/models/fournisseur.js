"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FournisseurModel = void 0;
class FournisseurModel {
    static fromEntity(snapshot) {
        let obj = new FournisseurModel();
        obj.code = snapshot.code;
        obj.nom = snapshot.nom;
        obj.postnom = snapshot.postnom;
        obj.prenom = snapshot.prenom;
        obj.societe = snapshot.societe;
        obj.tel = snapshot.tel;
        obj.mail = snapshot.mail;
        obj.adresse = snapshot.adresse;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.rccm = snapshot.rccm;
        obj.idNat = snapshot.idNat;
        return obj;
    }
}
exports.FournisseurModel = FournisseurModel;
//# sourceMappingURL=fournisseur.js.map