import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional } from "class-validator"

export namespace GetAccountDTO {
    export class GetAccountRequest {
        @IsOptional({
            message: 'User id is optional'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        @ApiProperty()
        public userId: number;
        
        constructor(userId: number) {
            this.userId = userId;
        }
    }

    export class GetAccountResponse {
        @ApiProperty()
        public wattInPool: number;

        @ApiProperty()
        public busdInPool: number;
        
        @ApiProperty()
        public orderCount: number;

        @ApiProperty()
        public wattOrderCount: number;

        @ApiProperty()
        public busdOrderCount: number;

        constructor(wattInPool: number, busdInPool: number, orderCount: number, wattOrderCount: number, busdOrderCount: number) {
            this.busdInPool = busdInPool;
            this.wattInPool = wattInPool;
            this.orderCount = orderCount;
            this.wattOrderCount = wattOrderCount;
            this.busdOrderCount = busdOrderCount;
        }
    }
};