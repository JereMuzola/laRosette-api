"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailFactureModel = void 0;
class DetailFactureModel {
    static fromEntity(snapshot) {
        const obj = new DetailFactureModel();
        obj.id = snapshot.id;
        obj.montant = snapshot.montant;
        obj.clientOccupant = snapshot.clientOccupant;
        obj.fkClientOccupant = snapshot.fkClientOccupant;
        obj.fkChambre = snapshot.fkChambre;
        obj.numChambre = snapshot.numChambre;
        obj.fkFacture = snapshot.fkFacture;
        return obj;
    }
}
exports.DetailFactureModel = DetailFactureModel;
//# sourceMappingURL=detail.facture.js.map