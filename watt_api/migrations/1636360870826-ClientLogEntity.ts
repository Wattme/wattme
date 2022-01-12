import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientLogEntity1636360870826 implements MigrationInterface {
    name = 'ClientLogEntity1636360870826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`title\` varchar(256) NOT NULL, \`method\` varchar(256) NOT NULL, \`message\` mediumtext NOT NULL, \`error\` tinyint NOT NULL, \`coin_code\` varchar(32) NOT NULL, \`coin_address\` varchar(256) NOT NULL, \`platform\` enum ('ios', 'android') NOT NULL, \`app_version\` varchar(32) NOT NULL, \`device_info\` mediumtext NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`client_logs\``);
    }

}
