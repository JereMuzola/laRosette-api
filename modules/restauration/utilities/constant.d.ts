export declare enum CommandeState {
    INIT = "INIT",
    VALIDE = "VALIDE",
    DECAISSE = "DECAISSE",
    ANNULE = "ANNULE"
}
export declare enum AchatState {
    INIT = "INIT",
    CLOTURE = "CLOTURE"
}
export declare enum TypeMouvement {
    ENTREE = "ENTREE",
    SORTIE = "SORTIE",
    INCIDENT = "INCIDENT"
}
export declare enum TypeArticle {
    RESTAURENT = "RESTAURENT",
    TERASSE = "TERASSE"
}
export declare enum BonDeDecaissementState {
    INIT = "INIT",
    APURE = "APURE"
}
export declare enum COMPTE {
    COURANT = "COURANT",
    BANQUE = "BANQUE"
}
export declare enum DEVISE {
    DOLLARS = "DOLLARS",
    CDF = "CDF"
}
export declare enum TypePaiement {
    LIQUIDE = "LIQUIDE",
    VIREMENT = "VIREMENT",
    CHEQUE = "CHEQUE"
}
export declare let TAUX: {
    tauxTva: number;
    tauxConversion: number;
};
