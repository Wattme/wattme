import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsOptional, IsString, Max } from "class-validator";

export namespace DisplayTableDTO {
    export class DisplayTableRequest {
        @IsDefined({
            message: 'Table is required'
        })
        @IsString({
            message: 'Table must be a string'
        })
        @ApiProperty()
        table: string;

        @IsOptional({
            message: 'Filters are optional'
        })
        @ApiPropertyOptional()
        filters?: Record<string, string>;

        @IsOptional({
            message: 'Filters are optional'
        })
        @ApiPropertyOptional()
        sort?: Record<string, string>;

        @IsOptional({
            message: 'Page is required'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Page must be an int'
        })
        @ApiPropertyOptional()
        page?: number;

        @IsOptional({
            message: 'Limit is required'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Limit must be an int'
        })
        @Max(50, {
            message: 'Limit must be less than or equal to 50'
        })
        @ApiPropertyOptional()
        limit?: number;

        constructor(table: string, filters: Record<string, string>, sort: Record<string, string>, page?: number, limit?: number) {
            this.table = table;
            this.filters = filters; 
            this.sort = sort;
            this.page = page;
            this.limit = limit;
        }
    }

    export class DisplayTableResponse {
        @ApiProperty()
        data: any[];

        constructor(data: any[]) {
            this.data = data;
        }
    }
};