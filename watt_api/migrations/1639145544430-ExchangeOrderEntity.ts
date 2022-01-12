import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeOrderEntity1639145544430 implements MigrationInterface {
    name = 'ExchangeOrderEntity1639145544430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal(16,16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`price\` \`price\` decimal NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`price\` \`price\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal(10,0) NOT NULL`);
    }

}
