"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAUX = exports.TypePaiement = exports.DEVISE = exports.COMPTE = exports.BonDeDecaissementState = exports.TypeArticle = exports.TypeMouvement = exports.AchatState = exports.CommandeState = void 0;
var CommandeState;
(function (CommandeState) {
    CommandeState["INIT"] = "INIT";
    CommandeState["VALIDE"] = "VALIDE";
    CommandeState["DECAISSE"] = "DECAISSE";
    CommandeState["ANNULE"] = "ANNULE";
})(CommandeState = exports.CommandeState || (exports.CommandeState = {}));
var AchatState;
(function (AchatState) {
    AchatState["INIT"] = "INIT";
    AchatState["CLOTURE"] = "CLOTURE";
})(AchatState = exports.AchatState || (exports.AchatState = {}));
var TypeMouvement;
(function (TypeMouvement) {
    TypeMouvement["ENTREE"] = "ENTREE";
    TypeMouvement["SORTIE"] = "SORTIE";
    TypeMouvement["INCIDENT"] = "INCIDENT";
})(TypeMouvement = exports.TypeMouvement || (exports.TypeMouvement = {}));
var TypeArticle;
(function (TypeArticle) {
    TypeArticle["RESTAURENT"] = "RESTAURENT";
    TypeArticle["TERASSE"] = "TERASSE";
})(TypeArticle = exports.TypeArticle || (exports.TypeArticle = {}));
var BonDeDecaissementState;
(function (BonDeDecaissementState) {
    BonDeDecaissementState["INIT"] = "INIT";
    BonDeDecaissementState["APURE"] = "APURE";
})(BonDeDecaissementState = exports.BonDeDecaissementState || (exports.BonDeDecaissementState = {}));
var COMPTE;
(function (COMPTE) {
    COMPTE["COURANT"] = "COURANT";
    COMPTE["BANQUE"] = "BANQUE";
})(COMPTE = exports.COMPTE || (exports.COMPTE = {}));
var DEVISE;
(function (DEVISE) {
    DEVISE["DOLLARS"] = "DOLLARS";
    DEVISE["CDF"] = "CDF";
})(DEVISE = exports.DEVISE || (exports.DEVISE = {}));
var TypePaiement;
(function (TypePaiement) {
    TypePaiement["LIQUIDE"] = "LIQUIDE";
    TypePaiement["VIREMENT"] = "VIREMENT";
    TypePaiement["CHEQUE"] = "CHEQUE";
})(TypePaiement = exports.TypePaiement || (exports.TypePaiement = {}));
exports.TAUX = {
    tauxTva: 16,
    tauxConversion: 2020,
};
//# sourceMappingURL=constant.js.map