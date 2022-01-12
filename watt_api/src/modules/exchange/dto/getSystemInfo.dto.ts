import { ApiProperty } from "@nestjs/swagger";

export namespace GetSystemInfoDTO {
    export class GetSystemInfoRequest {
        
    }

    export class GetSystemInfoResponse {
        @ApiProperty()
        public address: string;

        @ApiProperty()
        public wattContract: string;

        @ApiProperty()
        public busdContract: string;

        @ApiProperty()
        public wattRate: number;

        @ApiProperty()
        public bnbBalance: string;

        @ApiProperty()
        public busdBalance: string;

        @ApiProperty()
        public wattBalance: string;

        constructor(
            address: string,
            wattContract: string,
            busdContract: string,
            wattRate: number,
            bnbBalance: string,
            busdBalance: string,
            wattBalance: string
        ) {
            this.address = address;
            this.wattContract = wattContract;
            this.busdContract = busdContract;
            this.wattRate = wattRate;
            this.bnbBalance = bnbBalance;
            this.busdBalance = busdBalance;
            this.wattBalance = wattBalance;
        }
    }
};