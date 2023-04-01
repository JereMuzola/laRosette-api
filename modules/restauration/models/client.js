"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
class ClientModel {
    static fromEntity(snapshot) {
        let obj = new ClientModel();
        obj.code = snapshot.code;
        obj.nom = snapshot.nom;
        obj.postnom = snapshot.postnom;
        obj.prenom = snapshot.prenom;
        obj.tel = snapshot.tel;
        obj.adresse_mail = snapshot.adresse_mail;
        obj.nationalite = snapshot.nationalite;
        obj.piece_identite = snapshot.piece_identite;
        obj.num_piece_identite = snapshot.num_piece_identite;
        obj.adresse = snapshot.adresse;
        obj.etat = snapshot.etat;
        obj.fkClientResponsable = snapshot.fkClientResponsable;
        obj.sexe = snapshot.sexe;
        obj.provenance = snapshot.provenance;
        obj.destination = snapshot.destination;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        return obj;
    }
}
exports.ClientModel = ClientModel;
//# sourceMappingURL=client.js.map