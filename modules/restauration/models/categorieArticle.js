"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorieArticleModel = void 0;
class CategorieArticleModel {
    static fromEntity(snapshot) {
        let obj = new CategorieArticleModel();
        obj.code = snapshot.code;
        obj.description = snapshot.description;
        obj.unite = snapshot.unite;
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        return obj;
    }
}
exports.CategorieArticleModel = CategorieArticleModel;
//# sourceMappingURL=categorieArticle.js.map