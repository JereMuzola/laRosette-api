"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
class ServiceModel {
    static fromEntity(snapshot) {
        const obj = new ServiceModel();
        obj.code = snapshot.code;
        obj.nom = snapshot.nom;
        obj.description = snapshot.description;
        obj.fkAgentGerant = snapshot.fkAgentGerant;
        obj.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.agentGerant = snapshot.agentGerant;
        obj.agent = snapshot.agent;
        obj.fkAgent = snapshot.fkAgent;
        return obj;
    }
}
exports.ServiceModel = ServiceModel;
//# sourceMappingURL=service.js.map