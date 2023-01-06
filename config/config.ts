import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    development : {
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DBNAME,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        dialect : "mysql"
    },
    test : {
        username : process.env.TEST_DB_USERNAME,
        password : process.env.TEST_DB_PASSWORD,
        database : process.env.TEST_DB_DBNAME,
        host : process.env.TEST_DB_HOST,
        port : process.env.TEST_DB_PORT,
        dialect : "mysql"
    },
    product : {
        username : process.env.PR_DB_USERNAME,
        password : process.env.PR_DB_PASSWORD,
        database : process.env.PR_DB_DBNAME,
        host : process.env.PR_DB_HOST,
        port : process.env.PR_DB_PORT,
        dialect : "mysql"
    }
}