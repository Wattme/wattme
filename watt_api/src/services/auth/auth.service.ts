import { Result } from "src/shared/concrete/Result";
import jsonwebtoken from 'jsonwebtoken';
import { IPayload } from "./interfaces/payload.interface";
import { ConfigService } from "src/config/config.service";
import { Injectable } from "@nestjs/common";
import { userRole } from "src/static/userRole";

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService
    ) {}

    public async sign(payload: IPayload): Promise<Result<string | undefined, Error | undefined>> {
        try {
            const jwt = jsonwebtoken.sign(payload, this.configService.props.app.jwtSecret);
            return Result.ok(jwt);
        } catch (ex: any) {
            return Result.fail(ex);
        }
    }

    public async decode(jwt: string): Promise<Result<IPayload | undefined, Error | undefined>> {
        try {
            const payload = jsonwebtoken.verify(jwt, this.configService.props.app.jwtSecret) as IPayload;
            if (!payload.role) {
                payload.role = userRole.default();
            }
        
            return Result.ok(payload);
        } catch (ex: any) {
            return Result.fail(ex);
        }
    }
}