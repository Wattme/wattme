import { Module } from "@nestjs/common";
import { LanguageMiddleware } from './language.middleware';

@Module({
    exports: [
        LanguageMiddleware
    ],
    providers: [
        LanguageMiddleware
    ]
})
export class LanguageModule {}