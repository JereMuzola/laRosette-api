"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChambreModel = void 0;
class ChambreModel {
    static fromEntity(snapshot) {
        const obj = new ChambreModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.description = snapshot.description;
        obj.etat = snapshot.etat;
        obj.prix = snapshot.prix;
        obj.fkDevise = snapshot.fkDevise;
        obj.devise = snapshot.devise;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        obj.tel = snapshot.tel;
        obj.numero = snapshot.numero;
        obj.status = snapshot.status;
        return obj;
    }
}
exports.ChambreModel = ChambreModel;
//# sourceMappingURL=chambre.js.map