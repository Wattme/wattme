import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeFillEntity1639224869912 implements MigrationInterface {
    name = 'ExchangeFillEntity1639224869912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` CHANGE \`value\` \`value\` decimal(20,8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` CHANGE \`value\` \`value\` decimal(4,0) NOT NULL`);
    }

}
