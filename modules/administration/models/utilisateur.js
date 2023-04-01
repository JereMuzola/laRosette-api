"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurModel = void 0;
class UtilisateurModel {
    static fromEntity(snapshot) {
        const obj = new UtilisateurModel();
        obj.code = snapshot.code;
        obj.username = snapshot.username;
        obj.password = snapshot.password;
        obj.fkAgentCreate = snapshot.fkAgentCreate;
        obj.fkAgent = snapshot.fkAgent;
        obj.role = snapshot.role;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.agentCreate = snapshot.agentCreate;
        obj.agent = snapshot.agent;
        obj.fkAgence = snapshot.fkAgence;
        obj.agence = snapshot.agence;
        return obj;
    }
}
exports.UtilisateurModel = UtilisateurModel;
//# sourceMappingURL=utilisateur.js.map