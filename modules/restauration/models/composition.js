"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionModel = void 0;
class CompositionModel {
    static fromEntity(snapshot) {
        let obj = new CompositionModel();
        obj.id = snapshot.id;
        obj.fkArticleComposant = snapshot.fkComposant;
        obj.fkArticleCompose = snapshot.fkCompose;
        obj.quantite = snapshot.quantite;
        obj.dateCreate = snapshot.dateCreate;
        obj.status = snapshot.status;
        obj.fkAgent = snapshot.fkAgent;
        obj.agent = snapshot.agent;
        return obj;
    }
}
exports.CompositionModel = CompositionModel;
//# sourceMappingURL=composition.js.map