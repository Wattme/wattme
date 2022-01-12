import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt } from "passport-jwt";
import { WalletException } from "src/exceptions/wallet.exception";
import { UserEntity } from "src/modules/users/user.entity";
import { AuthService } from "src/services/auth/auth.service";
import { Result } from "src/shared/concrete/Result";
import { Repository } from "typeorm";

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
    constructor(
        private authService: AuthService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super();
    }

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const jwtParser = ExtractJwt.fromHeader('x-auth-token');
        const token = jwtParser(request);
        
        if (!token) {
            return request;
            // throw WalletException.unauthorized('x-auth-token is not provided');
        }

        const tokenDecoded = await this.authService.decode(token);
        if (tokenDecoded.isFailure) {
            throw WalletException.unauthorized('x-auth-token is corrupted or expired');
        }

        const payload = tokenDecoded.getValue()!;

        const user = await this.userRepository.findOne({where: {
            id: payload.userId
        }});

        if (!user) {
            throw WalletException.notFound('User with id does not exist');
        }

        request.payload = payload;

        return request;
    }
}