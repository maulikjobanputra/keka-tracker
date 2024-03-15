"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const routes_1 = __importDefault(require("./routes/routes"));
const app = new app_1.App([routes_1.default]);
app.listen();
//# sourceMappingURL=index.js.map