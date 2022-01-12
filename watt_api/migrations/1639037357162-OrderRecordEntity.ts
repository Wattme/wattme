import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderRecordEntity1639037357162 implements MigrationInterface {
    name = 'OrderRecordEntity1639037357162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_records\` (\`id\` int NOT NULL AUTO_INCREMENT, \`keys_id\` int NOT NULL, \`symbol\` varchar(16) NOT NULL, \`baseAsset\` varchar(8) NOT NULL, \`quoteAsset\` varchar(8) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_records\` ADD CONSTRAINT \`FK_c09d269ad4a17b0fde49e56a052\` FOREIGN KEY (\`keys_id\`) REFERENCES \`keys\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_records\` DROP FOREIGN KEY \`FK_c09d269ad4a17b0fde49e56a052\``);
        await queryRunner.query(`DROP TABLE \`order_records\``);
    }
}
