const crypto = require("crypto");
const fs = require("node:fs");

module.exports = {
    encrypt(input, output, password) {
        console.log(`1. Encrypting ${input} With Password...`);
        const passwordHash = crypto.createHash("sha512").update(password).digest("hex");
        const hashLength = 128;
        const inputContents = fs.readFileSync(input);
        const inputContentsLength = inputContents.length;
        const repeats = (inputContentsLength - (inputContentsLength % hashLength)) / hashLength;
        var repeatsString = "";
        for (let i = 0; i < repeats; i++) {
            repeatsString += passwordHash;
        }
        const overflow = inputContentsLength % hashLength;
        const overflowString = passwordHash.substring(0, overflow);
        const lengthedHash = Buffer.from(repeatsString + overflowString).toJSON().data;
        var outputContentBytes = [];
        Buffer.from(inputContents).toJSON().data.forEach((byte, index) => {
            outputContentBytes.push(byte + lengthedHash[index]);
        });
        console.log(`2. Write Data To Output Path Provided.`);
        fs.writeFileSync(output, Buffer.from(outputContentBytes));
        console.log(`3. File Encrypted SuccessFully.`);
    },
    decrypt(input, output, password) {
        console.log(`1. Decrypting ${input} With Password...`);
        const passwordHash = crypto.createHash("sha512").update(password).digest("hex");
        const hashLength = 128;
        const inputContents = fs.readFileSync(input);
        const inputContentsLength = inputContents.length;
        const repeats = (inputContentsLength - (inputContentsLength % hashLength)) / hashLength;
        var repeatsString = "";
        for (let i = 0; i < repeats; i++) {
            repeatsString += passwordHash;
        }
        const overflow = inputContentsLength % hashLength;
        const overflowString = passwordHash.substring(0, overflow);
        const lengthedHash = Buffer.from(repeatsString + overflowString).toJSON().data;
        var outputContentBytes = [];
        Buffer.from(inputContents).toJSON().data.forEach((byte, index) => {
            outputContentBytes.push(byte - lengthedHash[index]);
        });
        console.log(`2. Write Data To Output Path Provided.`);
        fs.writeFileSync(output, Buffer.from(outputContentBytes));
        console.log(`3. File Decrypted SuccessFully.`);
    }
}