// const UserSchemaValidation = {
//     schema: {
//         tags: ["User"], // Descriptive tags for grouping in documentation
//         body: {
//             type: "object",
//             required: ["name", "email", "age", "country"],
//             properties: {
//                 name: { type: "string", description: "The first name of the user" },
//                 email: { type: "string", description: "The last name of the user" },
//                 age: { type: "integer", description: "The age of the user" },
//             },
//         },
//         response: {
//             200: {
//                 description: "Successful response",
//                 type: "object",
//                 properties: {
//                     data: {
//                         type: "object",
//                         properties: {
//                             user: {
//                                 type: "object",
//                                 properties: {
//                                     uuid: { type: "string", description: "Unique ID for the user" },
//                                     name: { type: "string", description: "The first name of the user" },
//                                     email: { type: "string", description: "The last name of the user" },
//                                     age: { type: "integer", description: "The age of the user" },
//                                 },
//                             },
//                         },
//                     },
//                     status: {
//                         type: "object",
//                         properties: {
//                             code: { type: "integer", description: "HTTP status code" },
//                             message: { type: "string", description: "Response message" },
//                         },
//                     },
//                 },
//             },
//             400: {
//                 description: "Bad Request",
//                 type: "object",
//                 properties: {
//                     status: {
//                         type: "object",
//                         properties: {
//                             code: { type: "integer", description: "HTTP status code" },
//                             message: { type: "string", description: "Error message" },
//                         },
//                     },
//                 },
//             },
//             401: {
//                 description: "Unauthorized",
//                 type: "object",
//                 properties: {
//                     status: {
//                         type: "object",
//                         properties: {
//                             code: { type: "integer", description: "HTTP status code" },
//                             message: { type: "string", description: "Error message" },
//                         },
//                     },
//                 },
//             },
//             500: {
//                 description: "Internal Server Error",
//                 type: "object",
//                 properties: {
//                     status: {
//                         type: "object",
//                         properties: {
//                             code: { type: "integer", description: "HTTP status code" },
//                             message: { type: "string", description: "Error message" },
//                         },
//                     },
//                 },
//             },
//         },
//     },
//     querystring: {
//         /** Add query string validation here if needed */
//     },
//     params: {
//         /** Add URL parameter validation here if needed */
//     },
//     headers: {
//         /** Add header validation here if needed */
//     },
// };

// module.exports = UserSchemaValidation;


const Joi = require('joi');

const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().required(),
    });
    return schema.validate(data);
};

module.exports = userValidation;