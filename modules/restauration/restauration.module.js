"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RestaurationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurationModule = void 0;
const common_1 = require("@nestjs/common");
const orm_module_1 = require("../../orm/orm.module");
const logger_1 = require("../../utilities/logger");
const achat_controller_1 = require("./controllers/achat.controller");
const dao_achat_service_1 = require("./dao/dao.achat.service");
const achat_service_1 = require("./services/achat.service");
const dao_stock_service_1 = require("./dao/dao.stock.service");
const stock_service_1 = require("./services/stock.service");
const stock_controller_1 = require("./controllers/stock.controller");
const dao_vente_service_1 = require("./dao/dao.vente.service");
const vente_service_1 = require("./services/vente.service");
const vente_controller_1 = require("./controllers/vente.controller");
let RestaurationModule = RestaurationModule_1 = class RestaurationModule {
};
RestaurationModule = RestaurationModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [orm_module_1.OrmModule, RestaurationModule_1],
        controllers: [achat_controller_1.AchatController, stock_controller_1.StockController, vente_controller_1.Ventecontroller],
        providers: [logger_1.LoggerService, dao_achat_service_1.DaoAchatService, achat_service_1.AchatService, dao_stock_service_1.DaoStockService, stock_service_1.StockService, dao_vente_service_1.DaoVenteService, vente_service_1.VenteService],
        exports: [dao_stock_service_1.DaoStockService]
    })
], RestaurationModule);
exports.RestaurationModule = RestaurationModule;
//# sourceMappingURL=restauration.module.js.map