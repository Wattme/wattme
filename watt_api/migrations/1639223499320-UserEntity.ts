import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1639223499320 implements MigrationInterface {
    name = 'UserEntity1639223499320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`telegram_username\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`telegram_username\` varchar(256) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`telegram_username\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`telegram_username\` varchar(15) NULL`);
    }

}
