"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministrationModule = void 0;
const common_1 = require("@nestjs/common");
const orm_module_1 = require("../../orm/orm.module");
const utilisateur_controller_1 = require("./controllers/utilisateur.controller");
const dao_agence_service_1 = require("./dao/dao.agence.service");
const dao_agent_service_1 = require("./dao/dao.agent.service");
const dao_generic_service_1 = require("./dao/dao.generic.service");
const dao_service_service_1 = require("./dao/dao.service.service");
const dao_utilisateur_service_1 = require("./dao/dao.utilisateur.service");
const utilisateur_service_1 = require("./services/utilisateur.service");
const logger_1 = require("../../utilities/logger");
const agence_service_1 = require("./services/agence.service");
const agence_controller_1 = require("./controllers/agence.controller");
const service_service_1 = require("./services/service.service");
const agent_service_1 = require("./services/agent.service");
const service_controller_1 = require("./controllers/service.controller");
const agent_contoller_1 = require("./controllers/agent.contoller");
const hebergement_module_1 = require("../hebergement/hebergement.module");
const restauration_module_1 = require("../restauration/restauration.module");
let AdministrationModule = class AdministrationModule {
};
AdministrationModule = __decorate([
    (0, common_1.Module)({
        controllers: [utilisateur_controller_1.UtilisateurController, agence_controller_1.AgenceController, agent_contoller_1.AgentController, service_controller_1.ServiceController],
        providers: [logger_1.LoggerService, dao_generic_service_1.DaoGenericService, dao_agence_service_1.DaoAgenceService, dao_agent_service_1.DaoAgentService, service_service_1.ServiceService,
            dao_service_service_1.DaoServiceService, utilisateur_service_1.UtilisateurService, dao_utilisateur_service_1.DaoUtilisateurService, agence_service_1.AgenceService, agent_service_1.AgentService],
        exports: [],
        imports: [orm_module_1.OrmModule, hebergement_module_1.HebergementModule, restauration_module_1.RestaurationModule],
    })
], AdministrationModule);
exports.AdministrationModule = AdministrationModule;
//# sourceMappingURL=administration.module.js.map