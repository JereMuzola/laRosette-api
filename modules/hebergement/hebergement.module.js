"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HebergementModule = void 0;
const common_1 = require("@nestjs/common");
const orm_module_1 = require("../../orm/orm.module");
const logger_1 = require("../../utilities/logger");
const restauration_module_1 = require("../restauration/restauration.module");
const chambre_controller_1 = require("./controllers/chambre.controller");
const occupation_controller_1 = require("./controllers/occupation.controller");
const dao_chambre_service_1 = require("./dao/dao.chambre.service");
const dao_generic_service_1 = require("./dao/dao.generic.service");
const dao_occupation_service_1 = require("./dao/dao.occupation.service");
const chambre_service_1 = require("./services/chambre.service");
const occupation_service_1 = require("./services/occupation.service");
let HebergementModule = class HebergementModule {
};
HebergementModule = __decorate([
    (0, common_1.Module)({
        imports: [orm_module_1.OrmModule, restauration_module_1.RestaurationModule],
        controllers: [chambre_controller_1.ChambreController, occupation_controller_1.OccupationController],
        providers: [dao_generic_service_1.DaoGenericService, dao_chambre_service_1.DaoChambreService, chambre_service_1.ChambreService, logger_1.LoggerService, dao_occupation_service_1.DaoOccupationService, occupation_service_1.OccupationService],
        exports: [dao_chambre_service_1.DaoChambreService]
    })
], HebergementModule);
exports.HebergementModule = HebergementModule;
//# sourceMappingURL=hebergement.module.js.map