import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeOrderEntity1639224887706 implements MigrationInterface {
    name = 'ExchangeOrderEntity1639224887706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`side\` \`side\` varchar(4) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_orders\` CHANGE \`side\` \`side\` varchar(4) NOT NULL`);
    }

}
