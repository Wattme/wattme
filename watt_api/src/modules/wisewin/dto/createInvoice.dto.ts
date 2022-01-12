import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsNumber, IsOptional } from "class-validator";
import { ICreateInvoiceData } from "src/services/wisewin/interfaces/createInvoiceData.interface";

export namespace CreateInvoiceDTO {
    export class Request {
        @IsOptional({
            message: 'User id is defined'
        })
        @Type(() => Number)
        @IsInt({
            message: 'User id must be an int'
        })
        userId: number;

        @IsDefined({
            message: 'Price is defined'
        })
        @Type(() => Number)
        @IsNumber({}, {
            message: 'Price must be an int'
        })
        @ApiProperty()
        price: number;

        constructor(userId: number, price: number) {
            this.userId = userId;
            this.price = price;
        }
    }

    export class Response {
        @ApiProperty()
        invoice: ICreateInvoiceData;

        constructor(invoice: ICreateInvoiceData) {
            this.invoice = invoice;
        }
    }
};