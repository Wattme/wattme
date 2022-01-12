import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637077367631 implements MigrationInterface {
    name = 'UserEntity1637077367631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`telegram_username\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`country\` varchar(4) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`city\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(15) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`telegram_username\``);
    }

}
