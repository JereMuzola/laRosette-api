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
exports.DaoClientService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../restauration/models/client");
const dao_generic_service_1 = require("./dao.generic.service");
let DaoClientService = class DaoClientService {
    constructor(dao) {
        this.dao = dao;
    }
    async findAll() {
        return await this.dao.findAll(new client_1.ClientModel());
    }
};
DaoClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService])
], DaoClientService);
exports.DaoClientService = DaoClientService;
//# sourceMappingURL=dao.client.service.js.map