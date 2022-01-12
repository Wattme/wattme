import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeFillEntity1639223475843 implements MigrationInterface {
    name = 'ExchangeFillEntity1639223475843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` ADD \`seller_hash\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` ADD \`buyer_hash\` varchar(256) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` DROP COLUMN \`buyer_hash\``);
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` DROP COLUMN \`seller_hash\``);
    }

}
