import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeOrderEntity1639225263803 implements MigrationInterface {
    name = 'ExchangeOrderEntity1639225263803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal(20,8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal(4,0) NOT NULL`);
    }

}
