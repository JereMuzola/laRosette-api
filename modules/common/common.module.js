"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const orm_module_1 = require("../../orm/orm.module");
const logger_1 = require("../../utilities/logger");
const common_controller_1 = require("./controllers/common.controller");
const dao_common_servise_1 = require("./dao/dao.common.servise");
const common_service_1 = require("./services/common.service");
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [orm_module_1.OrmModule],
        controllers: [common_controller_1.CommonController],
        providers: [logger_1.LoggerService, dao_common_servise_1.DaoCommonService, common_service_1.CommonService],
        exports: [dao_common_servise_1.DaoCommonService, common_service_1.CommonService]
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map