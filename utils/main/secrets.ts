import dotenv from "dotenv"
dotenv.config()

const {
    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    PORT,
    APP_VERSION,
    NODE_ENV
    } = process.env
    
    const requiredCredentials =["DB_HOST","DB_USER","DB_NAME","DB_PASSWORD"]
    
    for(const credential of requiredCredentials){
        if(credential === undefined){
            console.log(`The credentail ${credential} is missing`)
            process.exit(1)
        }
    }

    const ALLOWED_ORIGINS : Array<string>= []

    export  {DB_PORT,DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,JWT_SECRET,PORT,APP_VERSION,NODE_ENV,ALLOWED_ORIGINS};