import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeOrderEntity1639061774674 implements MigrationInterface {
    name = 'ExchangeOrderEntity1639061774674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exchange_orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`system_address\` varchar(45) NOT NULL, \`address\` varchar(45) NOT NULL, \`value\` decimal NOT NULL, \`side\` varchar(4) NOT NULL, \`price\` decimal NOT NULL, \`symbol\` varchar(45) NOT NULL, \`confirmed\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        // await queryRunner.query(`ALTER TABLE \`exchange_orders\` ADD CONSTRAINT \`FK_e528bac78cf544441b57c7cce73\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`exchange_orders\` DROP FOREIGN KEY \`FK_e528bac78cf544441b57c7cce73\``);
        await queryRunner.query(`DROP TABLE \`exchange_orders\``);
    }

}
