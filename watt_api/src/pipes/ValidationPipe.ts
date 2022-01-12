import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer';
import { WalletException } from "src/exceptions/wallet.exception";

export class ValidationPipe implements PipeTransform {
    public async transform(value: any, metaData: ArgumentMetadata) {
        const { metatype } = metaData; 

        const object = plainToClass(metatype!, value);
        const errors = await validate(object);

        if (errors.length) {
            throw WalletException.invalidData(errors);
        }

        return value;
    }
}