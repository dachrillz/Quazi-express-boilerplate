import config from '../config';

class Logger{
    constructor() {
        console.info("Created Logger");
    }
    info(data){
        console.info(data);
    }
    fatal(data){
        console.error(data);
    }
    error(data){
        console.error(data);
    }
}

export default new Logger();



