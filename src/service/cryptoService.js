import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });



class CryptoService {
    #key;
    #algorithm;

    constructor(key, algorithm) {
        this.#key = key;
        this.#algorithm = algorithm;
    }

    encrypt(sourceText) {
        try {
            const iv = crypto.randomBytes(12); 
            const cipher = crypto.createCipheriv(this.#algorithm, this.#key, iv, { authTagLength: 16 });
            let encryptedData = cipher.update(sourceText, "utf-8", "hex");
            encryptedData += cipher.final("hex");
            const authTag = cipher.getAuthTag().toString('hex');
            return `${encryptedData}:${iv.toString('hex')}:${authTag}`;
        }
        catch(error) {
            console.log("error when encrypting text -->", error);
        }
    }

    decrypt(encryptedData) {
        try {
            const [encryptedText, ivHex, authTagHex] = encryptedData.split(":");
            const iv = Buffer.from(ivHex, 'hex'); 
            const authTag = Buffer.from(authTagHex, 'hex');
            const decipher = crypto.createDecipheriv(this.#algorithm, this.#key, iv, { authTagLength: 16 });
            decipher.setAuthTag(authTag);
            let decryptedText = decipher.update(encryptedText, "hex", "utf-8");
            decryptedText += decipher.final("utf-8");
            return decryptedText;
        } 
        catch(error) {
            console.log("error when decrypting token -->", error);
            return null;
        }
    }
}




export default CryptoService;