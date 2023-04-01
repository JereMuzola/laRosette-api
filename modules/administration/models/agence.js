"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgenceModel = void 0;
class AgenceModel {
    constructor() {
        this.chambres = [];
    }
    static fromEntity(snapshot) {
        const obj = new AgenceModel();
        obj.code = snapshot.code;
        obj.description = snapshot.description;
        obj.adresse = snapshot.adresse;
        obj.commune = snapshot.commune;
        obj.ville = snapshot.ville;
        obj.province = snapshot.province;
        obj.quartier = snapshot.quartier;
        obj.territoire = snapshot.territoire;
        obj.secteur = snapshot.secteur;
        obj.village = snapshot.village;
        obj.avenue = snapshot.avenue;
        obj.numero = snapshot.numero;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        return obj;
    }
}
exports.AgenceModel = AgenceModel;
//# sourceMappingURL=agence.js.map