"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOccupationModel = void 0;
class DetailOccupationModel {
    static fromEntity(snapshot) {
        let obj = new DetailOccupationModel();
        obj.id = snapshot.id;
        obj.fkOccupation = snapshot.fkOccupation;
        obj.fkClient = snapshot.fkClient;
        obj.client = snapshot.client;
        obj.numChambre = snapshot.numChambre;
        obj.fkChambre = snapshot.fkChambre;
        obj.dateArrive = snapshot.dateArrive;
        obj.dateDepart = snapshot.dateDepart;
        obj.heureArrive = snapshot.heureArrive;
        obj.heureDepart = snapshot.heureDepart;
        obj.montantAPayer = Number(snapshot.montantaPAyer);
        obj.etat = snapshot.etat;
        return obj;
    }
}
exports.DetailOccupationModel = DetailOccupationModel;
//# sourceMappingURL=detail.occupation.js.map