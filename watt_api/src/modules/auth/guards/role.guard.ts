import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { WalletException } from 'src/exceptions/wallet.exception';
import { UserRole } from 'src/static/userRole';
import { JWTAuthGuard } from './jwtAuth.guard';

export const RoleGuard = (roles: UserRole | UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin extends JWTAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const payload = request.payload;
      const availableRoles = Array.isArray(roles) ? roles : [roles];

      const valid = availableRoles.some((r) => payload?.role.includes(r));
      if (!valid) {
        throw WalletException.forbidden('User cannot access this resource');
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
