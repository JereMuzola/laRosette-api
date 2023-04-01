"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryptor = void 0;
const bcrypt = require("bcrypt");
class Encryptor {
    static async encrypt(password) {
        return await bcrypt.hash(password, this.salt);
    }
    static async decrypt(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
exports.Encryptor = Encryptor;
Encryptor.salt = 15;
//# sourceMappingURL=encryption.js.map