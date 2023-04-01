"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailCommandeModel = void 0;
class DetailCommandeModel {
    static fromEntity(snapshot) {
        const obj = new DetailCommandeModel();
        obj.id = snapshot.id;
        obj.article = snapshot.article;
        obj.fkArticle = snapshot.fkArticle;
        obj.fkFournisseur = snapshot.fkFournisseur;
        obj.fournisseur = snapshot.fournisseur;
        obj.fkCommande = snapshot.fkCommande;
        obj.prix_unitaire = Number(snapshot.prix_unitaire);
        obj.quantite = Number(snapshot.quantite);
        return obj;
    }
}
exports.DetailCommandeModel = DetailCommandeModel;
//# sourceMappingURL=detailCommande.js.map