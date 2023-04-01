"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModel = void 0;
class ReservationModel {
    static fromEntity(snapshot) {
        const obj = new ReservationModel();
        obj.code = snapshot.code;
        obj.date_debut = snapshot.date_debut;
        obj.date_fin = snapshot.date_fin;
        obj.dateCreate = snapshot.dateCreate;
        obj.heure_debut = snapshot.heure_debut;
        obj.etat = snapshot.etat;
        obj.heure_fin = snapshot.heure_fin;
        obj.montant_a_payer = snapshot.montant_a_payer;
        obj.fkClient = snapshot.fkClient;
        obj.fkChambre = snapshot.fkChambre;
        obj.client = snapshot.client;
        obj.chambre = snapshot.chambre;
        obj.status = snapshot.status;
        return obj;
    }
}
exports.ReservationModel = ReservationModel;
//# sourceMappingURL=reservation.js.map