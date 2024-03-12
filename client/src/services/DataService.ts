import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";

export class DataService {
  private s3Client: S3Client;
  private authService: AuthService;

  constructor() {
    this.s3Client = new S3Client({});
    this.authService = new AuthService();
  }

  public async uploadPhoto(
    photo: File,
    userId: string,
    bookId: string
  ): Promise<string> {
    const credentials = await this.authService.getTemporaryCredentials();
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        credentials: credentials as any,
        region: "us-west-2",
      });
    }

    const command = new PutObjectCommand({
      Bucket: "book-keep-photo-bucket",
      Key: `${userId}/${bookId}/${photo.name}`,
      Body: photo,
    });

    await this.s3Client.send(command);
    return `https://book-keep-photo-bucket.s3-us-west-2.amazonaws.com/${command.input.Key}`;
  }
}
