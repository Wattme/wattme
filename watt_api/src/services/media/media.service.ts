import { Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import * as uuid from 'uuid';
import { Result } from "src/shared/concrete/Result";
import { Storage } from "@google-cloud/storage";
import path from "path";
import stream from 'stream';
import './cert/google_storage.json';
import { RequestLogService } from "src/requestLog/requestLog.service";

@Injectable()
export class MediaService {
    private storage: Storage;

    constructor(
        private configService: ConfigService,
        private requestLogService: RequestLogService
    ) {
        this.storage = this.makeStorage();
    }

    public async save(data: string): Promise<Result<string | undefined, Error | undefined>> {
        const before = new Date().getTime();
        const formattedData = data.replace(/^data:([A-Za-z-+/]+);base64,/, '');

            const buf = Buffer.from(formattedData, 'base64');

            const id = uuid.v4();
            // const mimeInfo = await fileType.fileTypeFromBuffer(buf);

            const { ext } = {ext: this.getExtension(data)};
            let filename = `${this.configService.props.googleStorage.folder}/${id}.${ext}`;

        try {
            const log = await this.requestLogService.create('post', 'gcFile.createWriteStream()', JSON.stringify({
                filename: filename,
                data: data
            }));

            return new Promise((resolve) => {
                const bucket = this.storage.bucket(this.configService.props.googleStorage.bucket);
                const dataStream = new stream.PassThrough();

                const gcFile = bucket.file(filename);

                dataStream.push(buf);
                dataStream.push(null);

                dataStream.pipe(gcFile.createWriteStream({
                    resumable: false,
                    validation: false,
                    metadata: {
                        'Cache-Control': 'public, max-age=31536000'
                    }
                }))
                    .on('error', async (ex) => {
                        if (ex) {
                            const after = new Date().getTime();
                            const responseTime = after - before;
                            await this.requestLogService.setResponse(log, 500, responseTime, JSON.stringify(ex));
                        }

                        return resolve(Result.fail(ex));
                    })
                    .on('finish', async () => {
                        filename = `${this.configService.props.googleStorage.url}/${filename}`;
                        const after = new Date().getTime();
                        const responseTime = after - before;
                        await this.requestLogService.setResponse(log, 0, responseTime, filename);

                        return resolve(Result.ok(filename));
                    });
            })
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create('post', 'gcFile.createWriteStream()', JSON.stringify({
                    filename: filename,
                    data: data
                }));
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }
            return Result.fail(ex);
        }
    }

    private getExtension(encoded: string): string {
        const pattern = /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/;

        let ext = '';

        const mime = encoded.match(pattern);
        
        if (mime && mime.length) {
            ext = mime[1].split('/')[1];
        }

        return ext;
    }

    private makeStorage(): Storage {
        return new Storage({keyFilename: path.join(__dirname, 'cert', 'google_storage.json')});
    }
}