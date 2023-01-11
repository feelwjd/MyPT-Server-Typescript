import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const INTERFACE_NAME = "CRTO";
const algorithm = 'aes-192-cbc';
const KEY = crypto.scryptSync(process.env.MYPASSWD!, 'salt', 24);



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
