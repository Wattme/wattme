import { Injectable } from "@nestjs/common";
import StringCrypto from "string-crypto";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class EncryptionService {
    private crypter: StringCrypto;

    constructor(
        private configService: ConfigService
    ) {
        this.crypter = new StringCrypto();
    }

    public encrypt(value: string): string {
        return this.crypter.encryptString(value, this.configService.props.app.secret);
    }

    public decrypt(value: string): string {
        return this.crypter.decryptString(value, this.configService.props.app.secret);
    }
}