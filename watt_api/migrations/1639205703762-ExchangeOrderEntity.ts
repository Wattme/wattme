import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeOrderEntity1639205703762 implements MigrationInterface {
    name = 'ExchangeOrderEntity1639205703762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` ADD \`hash\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`price\` \`price\` decimal(4) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`price\` \`price\` decimal(18,18) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal(18,18) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` DROP COLUMN \`hash\``);
    }
}
