"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeCompteAImputer = exports.EtatFactureOccupation = exports.EtatOccupation = exports.TypeOccupation = exports.EtatChambre = exports.TypeVente = exports.TypeDevise = exports.EtatLT = void 0;
var EtatLT;
(function (EtatLT) {
    EtatLT["ENCOURS"] = "ENCOURS";
    EtatLT["CLOS"] = "CLOTURE";
    EtatLT["ARCHIVE"] = "ARCHIVE";
})(EtatLT = exports.EtatLT || (exports.EtatLT = {}));
var TypeDevise;
(function (TypeDevise) {
    TypeDevise["USD"] = "USD";
    TypeDevise["CDF"] = "CDF";
})(TypeDevise = exports.TypeDevise || (exports.TypeDevise = {}));
var TypeVente;
(function (TypeVente) {
    TypeVente["COMPTANT"] = "COMPTANT";
    TypeVente["CREDIT"] = "CREDIT";
})(TypeVente = exports.TypeVente || (exports.TypeVente = {}));
var EtatChambre;
(function (EtatChambre) {
    EtatChambre["LIBRE"] = "LIBRE";
    EtatChambre["RESERVE"] = "RESERVE";
    EtatChambre["OCCUPE"] = "OCCUPE";
    EtatChambre["ENTRETIEN"] = "ENTRETIEN";
})(EtatChambre = exports.EtatChambre || (exports.EtatChambre = {}));
var TypeOccupation;
(function (TypeOccupation) {
    TypeOccupation["PI"] = "PAIEMENT IMMEDIAT";
    TypeOccupation["PD"] = "PAIEMENT DIFFERE";
})(TypeOccupation = exports.TypeOccupation || (exports.TypeOccupation = {}));
var EtatOccupation;
(function (EtatOccupation) {
    EtatOccupation["ENCOURS"] = "ENCOURS";
    EtatOccupation["FINI"] = "FINI";
})(EtatOccupation = exports.EtatOccupation || (exports.EtatOccupation = {}));
var EtatFactureOccupation;
(function (EtatFactureOccupation) {
    EtatFactureOccupation["NON_PAYE"] = "NON PAYE";
    EtatFactureOccupation["PP"] = "PARTIELLEMENT PAYE";
    EtatFactureOccupation["PAYE"] = "TOTALEMENT PAYE";
})(EtatFactureOccupation = exports.EtatFactureOccupation || (exports.EtatFactureOccupation = {}));
var CodeCompteAImputer;
(function (CodeCompteAImputer) {
    CodeCompteAImputer["VENTE_MARCHANDISES"] = "7011";
    CodeCompteAImputer["VENTE_PLATS"] = "7021";
    CodeCompteAImputer["VENTE_AUBERGE"] = "7061";
    CodeCompteAImputer["CAISSE_SIEGE_UML"] = "5711";
    CodeCompteAImputer["CAISSE_SIEGE_DEV"] = "5712";
    CodeCompteAImputer["CAISSE_SUCCURSALE_UML"] = "5721";
    CodeCompteAImputer["CAISSE_SUCCURSALE_DEV"] = "5722";
})(CodeCompteAImputer = exports.CodeCompteAImputer || (exports.CodeCompteAImputer = {}));
//# sourceMappingURL=constant.js.map