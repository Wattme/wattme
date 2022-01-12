import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637826822933 implements MigrationInterface {
    name = 'UserEntity1637826822933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`dob\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`picture\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`location\` varchar(4) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`picture\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dob\``);
    }

}
