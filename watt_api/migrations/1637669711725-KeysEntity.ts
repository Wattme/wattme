import {MigrationInterface, QueryRunner} from "typeorm";

export class KeysEntity1637669711725 implements MigrationInterface {
    name = 'KeysEntity1637669711725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`keys\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`keys\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`keys\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`keys\` DROP COLUMN \`created_at\``);
    }

}
