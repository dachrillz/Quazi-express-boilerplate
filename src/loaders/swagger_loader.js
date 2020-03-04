import Logger from "./logger";
import {safeLoad} from "js-yaml";
import {promises as fs} from 'fs';
import path from 'path';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    // Path to the API docs, uses Node Glob
    apis : ['./src/api/**/*.js']
};

async function loadYaml(appRoot){
    //Has to be named swaggerDefinition
    options['swaggerDefinition'] = safeLoad(
        await fs.readFile(path.join(appRoot, '/loaders/swagger_doc.yml'), 'utf8'));
}

export default async function (app) {
    await loadYaml(app.appRoot);

    const swaggerAsJson = swaggerJSDoc(options);

    app.expressApp.use('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerAsJson);
    });
    Logger.info("Loaded Swagger spec");

    app.expressApp.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerAsJson));
    Logger.info("Done setting up Swagger UI");
}

