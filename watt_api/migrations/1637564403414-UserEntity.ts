import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637564403414 implements MigrationInterface {
    name = 'UserEntity1637564403414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`country\` varchar(45) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`country\` varchar(4) NULL`);
    }

}
