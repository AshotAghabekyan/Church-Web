import crypto from "node:crypto";



export class HashGenerator {
    private readonly alg: string;

    constructor(alg: string = "sha256") {
        this.alg = alg;
    }

    public textToHash(sourceText: string) {
        try {
            const hash: crypto.Hash = crypto.createHash(this.alg)
            hash.update(sourceText)
            return hash.digest("hex");
        }
        catch(error) {
            throw error;
        }
    }


    public compare(hashedText: string, targetText: string) {
        try {
            const targetHash: crypto.Hash = crypto.createHash(this.alg)
            targetHash.update(targetText);
            const hash: string = targetHash.digest("hex");
            return hash == hashedText;
        }
        catch(error) {
            throw error;
        }
    }   
}


