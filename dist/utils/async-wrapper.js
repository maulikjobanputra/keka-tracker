"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const status_code_1 = require("../constants/status-code");
const asyncWrapper = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next))
        .then((response) => {
        const { statusCode, data } = response;
        return res.status(statusCode || status_code_1.StatusCode.OK).json(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.asyncWrapper = asyncWrapper;
//# sourceMappingURL=async-wrapper.js.map