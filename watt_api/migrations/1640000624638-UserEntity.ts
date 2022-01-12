import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1640000624638 implements MigrationInterface {
    name = 'UserEntity1640000624638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(15) NOT NULL DEFAULT 'common'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
