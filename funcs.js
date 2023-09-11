const crypto = require("crypto");
const fs = require("node:fs");

module.exports = {
    bar: "|/-\\|/-\\".split(""),
    encrypt(input, output, password) {
        console.clear();
        console.log(`1. Encrypting ${input} With Password...`);
        const passwordHash = crypto.createHash("sha512").update(password).digest("hex");
        const passwordHashBytes = Buffer.from(passwordHash).toJSON().data;
        const inputContents = fs.readFileSync(input);
        console.log(`2. Write Data To Output Path Provided.`);
        fs.writeFileSync(output, "");
        for (let i = 0; i < inputContents.length / 10485760; i++) {
            console.clear();
            console.log(`1. Encrypting ${input} With Password...`);
            console.log(`2. Write Data To Output Path Provided.`);
            console.log(`[${this.bar[i % 8]}] Part ${i + 1}/${((inputContents.length - (inputContents.length % 10485760)) / 10485760) + (inputContents.length % 10485760 === 0 ? 0 : 1)}`);
            var outputContentBytes = [];
            Buffer.from(inputContents).slice(i * 10485760, (i + 1) * 10485760).toJSON().data.forEach((byte, index) => {
                outputContentBytes.push(byte + passwordHashBytes[index % 128]);
            });
            fs.writeFileSync(output, Buffer.concat([fs.readFileSync(output), Buffer.from(outputContentBytes)]))
        }
        console.clear();
        console.log(`1. Encrypting ${input} With Password...`);
        console.log(`2. Write Data To Output Path Provided.`);
        console.log(`3. File Encrypted SuccessFully.`);
    },
    decrypt(input, output, password) {
        console.clear();
        console.log(`1. Decrypting ${input} With Password...`);
        const passwordHash = crypto.createHash("sha512").update(password).digest("hex");
        const passwordHashBytes = Buffer.from(passwordHash).toJSON().data;
        const inputContents = fs.readFileSync(input);
        console.log(`2. Write Data To Output Path Provided.`);
        fs.writeFileSync(output, "");
        for (let i = 0; i < inputContents.length / 10485760; i++) {
            console.clear();
            console.log(`1. Decrypting ${input} With Password...`);
            console.log(`2. Write Data To Output Path Provided.`);
            console.log(`[${this.bar[i % 8]}] Part ${i + 1}/${((inputContents.length - (inputContents.length % 10485760)) / 10485760) + (inputContents.length % 10485760 === 0 ? 0 : 1)}`);
            var outputContentBytes = [];
            Buffer.from(inputContents).slice(i * 10485760, (i + 1) * 10485760).toJSON().data.forEach((byte, index) => {
                outputContentBytes.push(byte - passwordHashBytes[index % 128]);
            });
            fs.writeFileSync(output, Buffer.concat([fs.readFileSync(output), Buffer.from(outputContentBytes)]))
        }
        console.clear();
        console.log(`1. Decrypting ${input} With Password...`);
        console.log(`2. Write Data To Output Path Provided.`);
        console.log(`3. File Decrypted SuccessFully.`);
    }
}