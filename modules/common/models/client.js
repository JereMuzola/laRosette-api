"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
class ClientModel {
    static fromEntity(snapshot) {
        const obj = new ClientModel();
        obj.code = snapshot.code;
        obj.nom = snapshot.nom;
        obj.postnom = snapshot.postnom;
        obj.prenom = snapshot.prenom;
        obj.sexe = snapshot.sexe;
        obj.tel = snapshot.tel;
        obj.adresse_mail = snapshot.adresse_mail;
        obj.nationalite = snapshot.nationalite;
        obj.piece_identite = snapshot.piece_identite;
        obj.num_piece_identite = snapshot.num_piece_identite;
        obj.adresse = snapshot.adresse;
        obj.etat = snapshot.etat;
        obj.profession = snapshot.profession;
        obj.destination = snapshot.destination;
        obj.provenance = snapshot.provenance;
        obj.etat_civil = snapshot.etat_civil;
        obj.date_de_naissance = snapshot.date_de_naissance;
        obj.lieu_de_naissance = snapshot.lieu_de_naissance;
        obj.provenance = snapshot.provenance;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        obj.isAdult = snapshot.isAdult;
        obj.motifVoyage = snapshot.motifVoyage;
        obj.fkClientResponsable = snapshot.fkClientResponsable;
        obj.clientResponsable = snapshot.clientResponsable;
        return obj;
    }
}
exports.ClientModel = ClientModel;
//# sourceMappingURL=client.js.map