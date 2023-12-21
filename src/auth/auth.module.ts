import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { accessTokenGuard } from "./guard/access-token.guard";
import { accessTokenStrategy } from "./strategy/access-token.strategy";
import { refreshTokenGuard } from "./guard/refresh-token.guard";
import { refreshTokenStrategy } from "./strategy/refresh-token.strategy";
import { UserRoleGuard } from "./guard/user-role.guard";

@Module({
    imports: [UserModule, JwtModule],
    exports: [
        accessTokenGuard,
        accessTokenStrategy,
        refreshTokenGuard,
        refreshTokenStrategy,
        UserRoleGuard
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        accessTokenGuard,
        accessTokenStrategy,
        refreshTokenGuard,
        refreshTokenStrategy,
        UserRoleGuard
    ],
})
export class AuthModule {}
