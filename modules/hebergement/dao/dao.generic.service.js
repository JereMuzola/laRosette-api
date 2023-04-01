"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoGenericService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../orm/prisma.service");
const categorie_chambre_1 = require("../models/categorie.chambre");
const chambre_1 = require("../models/chambre");
const client_1 = require("../../common/models/client");
const occupation_1 = require("../models/occupation");
const reservation_1 = require("../models/reservation");
const detail_occupation_1 = require("../models/detail.occupation");
const utilsDate_1 = require("../../../utilities/utilsDate");
const detail_facture_1 = require("../models/detail.facture");
const facture_1 = require("../models/facture");
let DaoGenericService = class DaoGenericService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(obj, payload) {
        try {
            switch (obj.constructor) {
                case detail_occupation_1.DetailOccupationModel:
                    return await this.prisma.detailoccupation.create({
                        data: {
                            client: payload.client,
                            dateArrive: utilsDate_1.UtilDate.parseDate(payload.dateArrive),
                            dateDepart: utilsDate_1.UtilDate.parseDate(payload.dateDepart),
                            etat: payload.etat,
                            fkChambre: payload.fkChambre,
                            fkClient: payload.fkClient,
                            fkOccupation: payload.fkOccupation,
                            heureArrive: payload.heureArrive,
                            heureDepart: payload.heureDepart,
                            numChambre: payload.numChambre,
                            montantAPayer: Number(payload.montantAPayer)
                        }
                    });
                case detail_facture_1.DetailFactureModel:
                    return await this.prisma.detailsfacture.create({
                        data: {
                            clientOccupant: payload.clientOccupant,
                            fkChambre: payload.fkChambre,
                            fkClientOccupant: payload.fkClientOccupant,
                            fkFacture: payload.fkFacture,
                            montant: Number(payload.montant),
                            numChambre: payload.numChambre
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log("Erreur coté Serveur de BD");
            return null;
        }
    }
    async findAll(obj) {
        try {
            switch (obj.constructor) {
                case categorie_chambre_1.CategorieChambreModel:
                    return await this.prisma.categoriechambre.findMany({
                        where: {
                            status: true
                        }
                    });
                case chambre_1.ChambreModel:
                    return await this.prisma.chambre.findMany({
                        where: {
                            status: true
                        }
                    });
                case client_1.ClientModel:
                    return await this.prisma.client.findMany({
                        where: {
                            status: true
                        }
                    });
                case occupation_1.OccupationModel:
                    return await this.prisma.occupation.findMany({
                        where: {
                            status: true
                        }
                    });
                case reservation_1.ReservationModel:
                    return await this.prisma.reservation.findMany({
                        where: {
                            status: true
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async findUnique(obj, payload) {
        try {
            switch (obj.constructor) {
                case categorie_chambre_1.CategorieChambreModel:
                    return await this.prisma.categoriechambre.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case chambre_1.ChambreModel:
                    return await this.prisma.chambre.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case client_1.ClientModel:
                    return await this.prisma.client.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case detail_facture_1.DetailFactureModel:
                    return await this.prisma.detailsfacture.findUnique({
                        where: {
                            id: payload
                        }
                    });
                case detail_occupation_1.DetailOccupationModel:
                    return await this.prisma.detailoccupation.findUnique({
                        where: {
                            id: payload
                        }
                    });
                case reservation_1.ReservationModel:
                    return await this.prisma.reservation.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case occupation_1.OccupationModel:
                    return await this.prisma.occupation.findUnique({
                        where: {
                            code: payload
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async findWhere(obj, payload) {
        try {
            switch (obj.constructor) {
                case categorie_chambre_1.CategorieChambreModel:
                    return await this.prisma.categoriechambre.findMany({
                        where: payload
                    });
                case chambre_1.ChambreModel:
                    return await this.prisma.chambre.findMany({
                        where: payload
                    });
                case client_1.ClientModel:
                    return await this.prisma.client.findMany({
                        where: payload
                    });
                case detail_occupation_1.DetailOccupationModel:
                    return await this.prisma.detailoccupation.findMany({
                        where: payload
                    });
                case reservation_1.ReservationModel:
                    return await this.prisma.reservation.findMany({
                        where: payload
                    });
                case detail_facture_1.DetailFactureModel:
                    return await this.prisma.detailsfacture.findMany({
                        where: payload
                    });
                case facture_1.FactureModel:
                    return await this.prisma.facture.findMany({
                        where: payload
                    });
                case occupation_1.OccupationModel:
                    return await this.prisma.occupation.findMany({
                        where: payload,
                        orderBy: {
                            code: "desc"
                        },
                        take: 100
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(obj, payload) {
        try {
            switch (obj.constructor) {
                case categorie_chambre_1.CategorieChambreModel:
                    return await this.prisma.categoriechambre.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            description: payload.description,
                            prix: payload.prix,
                        }
                    });
                case chambre_1.ChambreModel:
                    return await this.prisma.chambre.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            description: payload.description,
                            etat: payload.etat,
                            fkAgence: payload.fkAgence,
                            agence: payload.agence,
                            tel: payload.tel,
                            numero: payload.numero,
                            prix: payload.prix,
                            fkDevise: payload.fkDevise,
                            devise: payload.devise
                        }
                    });
                case client_1.ClientModel:
                    return await this.prisma.client.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            adresse: payload.adresse,
                            adresse_mail: payload.adresse_mail,
                            destination: payload.destination,
                            etat: payload.etat,
                            nationalite: payload.nationalite,
                            nom: payload.nom,
                            num_piece_identite: payload.num_piece_identite,
                            piece_identite: payload.piece_identite,
                            postnom: payload.postnom,
                            prenom: payload.prenom,
                            provenance: payload.provenance,
                            sexe: payload.sexe,
                            tel: payload.tel,
                        }
                    });
                case detail_facture_1.DetailFactureModel:
                    return await this.prisma.detailsfacture.update({
                        data: {
                            montant: payload.montant,
                            fkChambre: payload.fkChambre,
                            numChambre: payload.numChambre
                        },
                        where: {
                            id: payload.id,
                        }
                    });
                case detail_occupation_1.DetailOccupationModel:
                    return await this.prisma.detailoccupation.update({
                        where: {
                            id: payload.id
                        },
                        data: {
                            dateDepart: payload.dateDepart,
                            etat: payload.etat,
                            fkChambre: payload.fkChambre,
                            numChambre: payload.numChambre,
                            heureDepart: payload.heureDepart,
                            montantAPayer: payload.montantAPayer
                        }
                    });
                case reservation_1.ReservationModel:
                    return await this.prisma.reservation.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            date_debut: payload.date_debut,
                            date_fin: payload.date_fin,
                            etat: payload.etat,
                            fkChambre: payload.fkChambre,
                            fkClient: payload.fkClient,
                            heure_debut: payload.heure_debut,
                            heure_fin: payload.heure_fin,
                            montant_a_payer: Number(payload.montant_a_payer),
                        }
                    });
                case occupation_1.OccupationModel:
                    return await this.prisma.occupation.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            etat: payload.etat,
                            agent: payload.agent,
                            fkAgent: payload.fkAgent,
                            fkClientResponsable: payload.fkClientResponsable,
                            clientResponsable: payload.clientResponsable,
                            montantAPayer: Number(payload.montantAPayer),
                            fkReservation: payload.fkReservation,
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async logicDelete(obj, payload) {
        try {
            switch (obj.constructor) {
                case categorie_chambre_1.CategorieChambreModel:
                    return await this.prisma.categoriechambre.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                case chambre_1.ChambreModel:
                    return await this.prisma.chambre.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                case client_1.ClientModel:
                    return await this.prisma.client.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                case reservation_1.ReservationModel:
                    return await this.prisma.reservation.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                case occupation_1.OccupationModel:
                    return await this.prisma.occupation.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async definitiveDelete(obj, payload) {
        try {
            switch (obj.constructor) {
                case categorie_chambre_1.CategorieChambreModel:
                    return await this.prisma.categoriechambre.delete({
                        where: {
                            code: payload
                        }
                    });
                case chambre_1.ChambreModel:
                    return await this.prisma.chambre.delete({
                        where: {
                            code: payload
                        }
                    });
                case client_1.ClientModel:
                    return await this.prisma.client.delete({
                        where: {
                            code: payload
                        }
                    });
                case detail_occupation_1.DetailOccupationModel:
                    return await this.prisma.detailoccupation.delete({
                        where: {
                            id: payload
                        }
                    });
                case reservation_1.ReservationModel:
                    return await this.prisma.reservation.delete({
                        where: {
                            code: payload
                        }
                    });
                case occupation_1.OccupationModel:
                    return await this.prisma.occupation.delete({
                        where: {
                            code: payload
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
};
DaoGenericService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DaoGenericService);
exports.DaoGenericService = DaoGenericService;
//# sourceMappingURL=dao.generic.service.js.map