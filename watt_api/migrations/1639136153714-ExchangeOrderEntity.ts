import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeOrderEntity1639136153714 implements MigrationInterface {
    name = 'ExchangeOrderEntity1639136153714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` ADD \`complete\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`price\` \`price\` decimal NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`price\` \`price\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`value\` \`value\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` DROP COLUMN \`complete\``);
    }

}
