import {MigrationInterface, QueryRunner} from "typeorm";

export class RestorationEntity1638517645831 implements MigrationInterface {
    name = 'RestorationEntity1638517645831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`location\` \`location\` varchar(4) NULL DEFAULT 'en'`);
        await queryRunner.query(`ALTER TABLE \`restorations\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`restorations\` ADD \`code\` varchar(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restorations\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`restorations\` ADD \`code\` varchar(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`location\` \`location\` varchar(4) NULL`);
    }

}
