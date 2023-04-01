"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentModel = void 0;
class AgentModel {
    static fromEntity(snapshot) {
        const obj = new AgentModel();
        obj.code = snapshot.code;
        obj.adresse = snapshot.adresse;
        obj.nom = snapshot.nom;
        obj.postnom = snapshot.postnom;
        obj.prenom = snapshot.prenom;
        obj.sexe = snapshot.sexe;
        obj.telephone = snapshot.telephone;
        obj.fonction = snapshot.fonction;
        obj.isGerant = snapshot.isGerant;
        obj.mail = snapshot.mail;
        obj.etat_civil = snapshot.etat_civil;
        obj.province_origine = snapshot.province_origine;
        obj.district_origine = snapshot.district_origine;
        obj.territoire_origine = snapshot.territoire_origine;
        obj.secteur_origine = snapshot.secteur_origine;
        obj.groupement_origine = snapshot.groupement_origine;
        obj.village_origine = snapshot.village_origine;
        obj.lieu_naissance = snapshot.lieu_naissance;
        obj.date_naissance = snapshot.date_naissance;
        obj.fkAgence = snapshot.fkAgence;
        obj.fkService = snapshot.fkService;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkService = snapshot.fkService;
        obj.service = snapshot.service;
        obj.agence = snapshot.agence;
        return obj;
    }
}
exports.AgentModel = AgentModel;
//# sourceMappingURL=agent.js.map