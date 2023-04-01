"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorieChambreModel = void 0;
class CategorieChambreModel {
    static fromEntity(snapshot) {
        const obj = new CategorieChambreModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.description = snapshot.description;
        obj.prix = Number(snapshot.prix);
        obj.status = snapshot.status;
        return obj;
    }
}
exports.CategorieChambreModel = CategorieChambreModel;
//# sourceMappingURL=categorie.chambre.js.map