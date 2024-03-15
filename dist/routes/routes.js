"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const async_wrapper_1 = require("../utils/async-wrapper");
const router = (0, express_1.Router)();
const controller = new controllers_1.DefaultController();
const { defaultController, todayController } = controller;
router.get('/', (0, async_wrapper_1.asyncWrapper)(defaultController));
router.get('/today', (0, async_wrapper_1.asyncWrapper)(todayController));
exports.default = router;
//# sourceMappingURL=routes.js.map