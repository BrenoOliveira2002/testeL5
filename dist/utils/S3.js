"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3Client {
    constructor() {
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
    }
    async uploadFile(fileName, fileBuffer, type) {
        const params = {
            Bucket: "testel5",
            Key: fileName,
            Body: fileBuffer,
            ContentType: type,
        };
        try {
            const result = await this.s3.upload(params).promise();
            console.log("Arquivo enviado com sucesso para o S3.");
            return result.Location;
        }
        catch (error) {
            console.error("Erro ao enviar o arquivo para o S3:", error);
            throw error;
        }
    }
}
exports.default = new S3Client();
