import AWS from "aws-sdk";

class S3Client {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(fileName: string, fileBuffer: Buffer, type: string): Promise<string> {
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
    } catch (error) {
      console.error("Erro ao enviar o arquivo para o S3:", error);
      throw error;
    }
  }
}

export default new S3Client();
