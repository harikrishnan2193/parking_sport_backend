"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Parking Management API",
        version: "1.0.0",
        description: "API documentation for the Parking Management System",
    },
    servers: [
        {
            url: "http://localhost:5000",
            description: "Development server",
        },
    ],
};
// options for Swagger JSDoc
const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
// initialize swagger-jsdoc
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// function to setup Swagger
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.setupSwagger = setupSwagger;
