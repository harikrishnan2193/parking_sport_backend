import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

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
const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// function to setup Swagger
export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
