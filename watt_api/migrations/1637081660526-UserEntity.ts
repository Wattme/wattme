import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637081660526 implements MigrationInterface {
    name = 'UserEntity1637081660526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`wisewin_patron_code\` varchar(15) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`wisewin_patron_code\``);
    }

}
