"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailAchatModel = void 0;
class DetailAchatModel {
    static fromEntity(snapshot) {
        const obj = new DetailAchatModel();
        obj.id = snapshot.id;
        obj.fkArticle = snapshot.fkArticle;
        obj.article = snapshot.article;
        obj.fkFournisseur = snapshot.fkFournisseur;
        obj.fournisseur = snapshot.fournisseur;
        obj.fkAchat = snapshot.fkAchat;
        obj.prix_unitaire = snapshot.prix_unitaire;
        obj.quantite = snapshot.quantite;
        return obj;
    }
}
exports.DetailAchatModel = DetailAchatModel;
//# sourceMappingURL=detailAchat.js.map