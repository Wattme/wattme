import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { applicationLanguage } from "src/static/applicationLanguage";

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
    public async use(req: Request, res: Response, next: NextFunction) {
        const language = applicationLanguage.isValid((<any>req.headers)['x-language'] || '') ? (<any>req.headers)['x-language'] : applicationLanguage.default();
        (<any>req).language = language;
        next();
    }
}