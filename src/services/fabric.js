export default class Fabric {
    constructor(contract, client, network, channel) {
        this.contract = contract;
        this.client = client;
        this.network = network;
        this.channel = channel
    }

    async invoke(function_name, ...args) {
        return await this.contract.submitTransaction(function_name, ...args);
    }

    async query(function_name, ...args) {
        return await this.contract.evaluateTransaction(function_name, ...args);
    }

    async queryBlockByHeight(height){
        return await this.channel.queryBlock(height);
    }

    async queryBlockByHash(hash){
        const a = Buffer.from(hash, 'hex');
        return await this.channel.queryBlockByHash(a);
    }

    async queryBlockchainInfo() {
        return await this.channel.queryInfo();
    }

    async queryBlockByTxID(tx_id){
        return await this.channel.queryBlockByTxID(tx_id);
    }
}

