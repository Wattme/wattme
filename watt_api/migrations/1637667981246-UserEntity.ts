import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637667981246 implements MigrationInterface {
    name = 'UserEntity1637667981246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`binance_public_key\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`binance_secret_key\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`binance_secret_key\` varchar(1024) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`binance_public_key\` varchar(1024) NULL`);
    }

}
