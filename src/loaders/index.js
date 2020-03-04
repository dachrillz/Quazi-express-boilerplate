import Logger from './logger';
import fabric_loader from './fabric_loader';
import express_loader from './express_loader';
import swagger_loader from './swagger_loader';
import {Container} from 'typedi';
import yaml from 'js-yaml';
import {promises as fs} from 'fs';
import Helpers from "../services/helpers";

async function LoadSettings(name, path) {
    const loaded = yaml.safeLoad(await fs.readFile(path, 'utf8'));
    Logger.info(name + "\n" + JSON.stringify(loaded, null, 2));
    return loaded;
}

export default async function (app) {
    Logger.info('Loading modules');

    //Load Helper class
    Container.set("helpers", new Helpers());
    Logger.info('Loaded Helpers class');

    //Load settings @TODO: Here an environment variable should change if we load: local,syst
    const CCP_DEFAULT = `${app.appRoot}/config/common_connections_profile.yaml`;
    const SETTINGS_DEFAULT = `${app.appRoot}/config/fabric.yaml`;

    const loadedUserSettings = await LoadSettings("User Settings", SETTINGS_DEFAULT);

    //Load Fabric backend
    Logger.info(`The environment variable for process.env.MOCK is: ${process.env.MOCK}`);
    if (process.env.MOCK === 'true') {
        const err_string = 'Currently no mock is defined. This is a @TODO for the developers!';
        Logger.fatal(err_string);
        throw Error(err_string)
    } else {
        try{
            const fabric_instance = await fabric_loader(app.appRoot, CCP_DEFAULT, loadedUserSettings);
            Container.set("fabric", fabric_instance);
            Logger.info("Loaded fabric instance");
        } catch(e){
            Logger.fatal(`Failed to load fabric due to: ${e.message}`);
            throw e;
        }
    }

    //Load swagger configuration
    await swagger_loader(app);

    //Load express configuration
    express_loader(app.expressApp);

}