"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultController = void 0;
const services_1 = require("../services/services");
const services = new services_1.Service();
const { defaultService, getTodaysAttendance } = services;
class DefaultController {
    defaultController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield defaultService();
            }
            catch (error) {
                console.log(`Error while connecting to server!`);
                throw error;
            }
        });
    }
    todayController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = req.query;
                const requestDate = new Date(date).toISOString();
                return yield getTodaysAttendance(requestDate);
            }
            catch (error) {
                console.log(`Error while connecting to server!`);
                throw error;
            }
        });
    }
}
exports.DefaultController = DefaultController;
//# sourceMappingURL=controllers.js.map