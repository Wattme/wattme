import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "src/config/config.service";
import { WalletException } from "src/exceptions/wallet.exception";
import { IPayload } from "src/services/auth/interfaces/payload.interface";
import { Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";

export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
            ignoreExpiration: false,
            secretOrKey: configService.props.app.jwtSecret
        })
    }

    public async validate(payload: IPayload): Promise<UserEntity> {
        const { userId } = payload;

        const user = await this.userRepository.findOne({where: {
            id: userId
        }});
        
        if (!user) {
            throw WalletException.notFound('User with id does not exist');
        }

        return user;
    }
}