import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637748871724 implements MigrationInterface {
    name = 'UserEntity1637748871724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`wisewin_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`wisewin_id\``);
    }

}
