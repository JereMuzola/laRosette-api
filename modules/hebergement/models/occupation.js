"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccupationModel = void 0;
class OccupationModel {
    static fromEntity(snapshot) {
        const obj = new OccupationModel();
        obj.code = snapshot.code;
        obj.dateCreate = snapshot.dateCreate;
        obj.etat = snapshot.etat;
        obj.montantAPayer = snapshot.montantAPayer;
        obj.typeOccupation = snapshot.type_occupation;
        obj.status = snapshot.status;
        obj.fkReservation = snapshot.fkReservation;
        obj.clientResponsable = snapshot.clientResponsable;
        obj.fkClientResponsable = snapshot.fkClientResponsable;
        obj.agence = snapshot.agence;
        obj.fkAgence = snapshot.fkAgence;
        obj.typeOccupation = snapshot.typeOccupation;
        !snapshot.details ? obj.details = [] : obj.details = snapshot.details;
        obj.agent = snapshot.agent;
        obj.fkAgent = snapshot.fkAgent;
        return obj;
    }
}
exports.OccupationModel = OccupationModel;
//# sourceMappingURL=occupation.js.map