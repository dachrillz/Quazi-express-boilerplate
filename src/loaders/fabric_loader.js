import Fabric from '../services/fabric';
import { FileSystemWallet, X509WalletMixin, Gateway } from 'fabric-network';
import path from 'path';
import {promises as fs} from 'fs';

async function setupGateway(root, ccpPath, settings) {

    console.log("Setting up contract");

    const certPath = path.join(root, settings.userCertificate);
    const keyPath = path.join(root, settings.userKey);

    // Wallet
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);

    //Load User into Wallet
    let cert;
    let key;
    try{
        cert = await fs.readFile(certPath);
        key = await fs.readFile(keyPath);
    } catch(error){
        throw error;
    }

    const identityLabel = settings.identity;
    const identity = X509WalletMixin.createIdentity(settings.orgMsp, cert.toString(), key.toString());

    await wallet.import(identityLabel, identity);

    //Setup Gateway
    const gateway = new Gateway();

    await gateway.connect(ccpPath, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } });

    console.info("Done setting up gateway");
    return gateway;
}

function setupContract(network, chaincodeId) {
    const contract = network.getContract(chaincodeId);
    console.log("Done setting up contract");
    return contract;
}

function setupClient(gateway){
    return gateway.getClient();
}


export default async function fabric_loader(root, ccpPath, settings) {
    console.log("Calling Setup");

    const gateway = await setupGateway(root, ccpPath, settings);

    const network = await gateway.getNetwork(settings.channel);
    const channel = network.getChannel();

    const contract = setupContract(network, settings.chaincode);
    const client = setupClient(gateway);

    return new Fabric(contract, client, network, channel);
};

