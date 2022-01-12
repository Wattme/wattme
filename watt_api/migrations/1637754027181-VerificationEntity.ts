import {MigrationInterface, QueryRunner} from "typeorm";

export class VerificationEntity1637754027181 implements MigrationInterface {
    name = 'VerificationEntity1637754027181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verifications\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`verifications\` ADD \`code\` varchar(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verifications\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`verifications\` ADD \`code\` varchar(6) NOT NULL`);
    }

}
