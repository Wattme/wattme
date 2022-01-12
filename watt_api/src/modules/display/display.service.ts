import { Injectable } from "@nestjs/common";
import { WalletException } from "src/exceptions/wallet.exception";
import { Result } from "src/shared/concrete/Result";
import { FindOperator, FindOperatorType, getConnection, getRepository, Like } from "typeorm";
import { DisplayTableDTO } from "./dto/displayTable.dto";
import { GetTablesDTO } from "./dto/getTables.dto";

@Injectable()
export class DisplayService {
    constructor() {

    }

    public async getTables(request: GetTablesDTO.GetTablesRequest): Promise<Result<GetTablesDTO.GetTablesResponse | undefined, WalletException | undefined>> {
        const entitiesMetadata = getConnection().entityMetadatas;
        
        const tables: GetTablesDTO.Table[] = entitiesMetadata.map(e => {
            return {
                name: e.tableName,
                filters: e.columns.map(c => c.propertyName)
            }
        });

        const getTablesResponse = new GetTablesDTO.GetTablesResponse(tables);

        return Result.ok(getTablesResponse);
    }

    public async displayTable(request: DisplayTableDTO.DisplayTableRequest): Promise<Result<DisplayTableDTO.DisplayTableResponse | undefined, WalletException | undefined>> {
        const entityMetadata = getConnection().entityMetadatas.find(metadata => metadata.tableName == request.table);
        if (!entityMetadata) {
            return Result.fail(WalletException.notFound('Entity metadata not found'));
        }

        const repository = getRepository(entityMetadata.name);
        if (!repository) {
            return Result.fail(WalletException.notFound('Repository not found'));
        }

        const limit = request.limit || 10;
        const page = request.page || 1;
        const skip = (page - 1) * limit;

        const entity = await repository.findOne({ }) as any | undefined;
        const where = this.buildWhere(entity, request.filters)
        const sort = request.sort || { id: 'DESC' };

        const data = await repository.find({ where: where, take: limit, skip: skip, order: sort });

        const displayTableResponse = new DisplayTableDTO.DisplayTableResponse(data.map((v: any) => v.sanitize ? v.sanitize() : v));

        return Result.ok(displayTableResponse);
    }

    private buildWhere(entity?: any, filters?: Record<string, string>) {
        const where: Record<string, any> = {};

        if (!filters || !entity) {
            return where;
        }
        
        for (const [key, value] of Object.entries(filters)) {
            const type = typeof entity[key];
            if (type == 'undefined') {
                continue;
            }
            
            switch (type) {
                case 'string':
                    where[key] = Like(`%${value}%`);
                    break;
                case 'number':
                    where[key] = Number(value);
                    break;
                default:
                    where[key] = value;
            }
        }

        return where;
    }
}