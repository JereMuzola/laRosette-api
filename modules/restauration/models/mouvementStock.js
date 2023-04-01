"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouvementStockModel = void 0;
class MouvementStockModel {
    static fromEntity(snapshot) {
        const obj = new MouvementStockModel();
        obj.id = snapshot.id;
        obj.fkStock = snapshot.fkStock;
        obj.article = snapshot.article;
        obj.fkArticle = snapshot.fkArticle;
        obj.fkFournisseur = snapshot.fkFournisseur;
        obj.fkClient = snapshot.fkClient;
        obj.typeMouvement = snapshot.typeMouvement;
        obj.quantite = Number(snapshot.quantite);
        obj.prix_unitaire_mouvement = Number(snapshot.prix_unitaire_mouvement);
        obj.dateFab = snapshot.dateFab;
        obj.dateExp = snapshot.dateExp;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkAgent = snapshot.fkAgent;
        obj.agence = snapshot.agence;
        obj.agent = snapshot.agent;
        obj.fkAgence = snapshot.fkAgence;
        return obj;
    }
}
exports.MouvementStockModel = MouvementStockModel;
//# sourceMappingURL=mouvementStock.js.map