import crypto from 'crypto';
import dotenv from 'dotenv';
import util from 'util';
dotenv.config();
const INTERFACE_NAME = "CRTO";
const algorithm = 'aes-192-cbc';
const KEY = crypto.scryptSync(process.env.MYPASSWD!, 'salt', 24);
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
    const buf = await randomBytesPromise(64);
    return buf.toString('base64');
};

export const createHashedPassword = async (password: string) => {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 100000, 64, 'sha512');
    const hashedPassword = key.toString('base64');
    return { salt, hashedPassword };
};

export const checkPassword = async (password: string, salt: string, hashedPassword: string) => {
    const key = await pbkdf2Promise(password, salt, 100000, 64, 'sha512');
    const hashedPassword2 = key.toString('base64');
    return hashedPassword === hashedPassword2;
};

export function encrypt(text: string) {
    if (text.length < 16) {
        try{
            var cipher: any = crypto.createCipheriv(algorithm, KEY, Buffer.from(process.env.IV!));
            let encrypted: any = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }catch(e){
            console.log(e);
        }
    }
}

export function decrypt(text: string) {
    try{
        let encryptedData: any = Buffer.from(text, "hex");
        var decipher: any = crypto.createDecipheriv(algorithm, KEY, process.env.IV!);
        let decrypted: any = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }catch(e){
        console.log(e);
    }
}

export function sha256(password: string){
    try{
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }catch(e){
        console.log(e);
    }
}
