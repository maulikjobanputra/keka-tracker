"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const { PORT } = process.env;
class App {
    constructor(routers) {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRouters(routers);
        this.port = PORT;
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    initializeRouters(routers) {
        for (const router of routers) {
            this.app.use('/', router);
        }
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App running on port ${this.port}!`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map