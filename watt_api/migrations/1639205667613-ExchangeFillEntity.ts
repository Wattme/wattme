import {MigrationInterface, QueryRunner} from "typeorm";

export class ExchangeFillEntity1639205667613 implements MigrationInterface {
    name = 'ExchangeFillEntity1639205667613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exchange_fills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`buy_order_id\` int NOT NULL, \`sell_order_id\` int NOT NULL, \`value\` decimal(4) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` ADD CONSTRAINT \`FK_be8ee739ca451b8de014c43d528\` FOREIGN KEY (\`buy_order_id\`) REFERENCES \`exchange_orders\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` ADD CONSTRAINT \`FK_9efae7ad11772146e5b01c26b92\` FOREIGN KEY (\`sell_order_id\`) REFERENCES \`exchange_orders\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` DROP FOREIGN KEY \`FK_9efae7ad11772146e5b01c26b92\``);
        await queryRunner.query(`ALTER TABLE \`exchange_fills\` DROP FOREIGN KEY \`FK_be8ee739ca451b8de014c43d528\``);
        await queryRunner.query(`DROP TABLE \`exchange_fills\``);
    }

}
