const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce COVID-19 API",
      version: "1.0.0",
      description: "API REST para e-commerce de productos para prevención COVID-19",
      contact: {
        name: "API Support",
        email: "fvalverdeu@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Desarrollo",
      },
      {
        url: "https://api.example.com",
        description: "Producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            name: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "number",
            },
            category: {
              type: "string",
            },
            image: {
              type: "string",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            error: {
              type: "object",
            },
          },
        },
      },
    },
  },
  apis: ["./api/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
