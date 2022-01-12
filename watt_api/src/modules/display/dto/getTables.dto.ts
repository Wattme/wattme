import { ApiProperty } from "@nestjs/swagger";

export namespace GetTablesDTO {
    export type Table = {
        name: string;
        filters: string[];
    };
    
    export class GetTablesRequest {
        
    }

    export class GetTablesResponse {
        @ApiProperty()
        tables: Table[];

        constructor(tables: Table[]) {
            this.tables = tables;
        }
    }
};