import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637138635104 implements MigrationInterface {
    name = 'UserEntity1637138635104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`binance_public_key\` varchar(1024) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`binance_secret_key\` varchar(1024) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`verified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`full\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`binance\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`binance\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`verified\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`binance_secret_key\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`binance_public_key\``);
    }

}
