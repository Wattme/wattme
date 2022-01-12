import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientLogEntity1636362005166 implements MigrationInterface {
    name = 'ClientLogEntity1636362005166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`title\` \`title\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`method\` \`method\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`message\` \`message\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`error\` \`error\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`coin_code\` \`coin_code\` varchar(32) NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`coin_address\` \`coin_address\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`platform\` \`platform\` enum ('ios', 'android') NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`app_version\` \`app_version\` varchar(32) NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`device_info\` \`device_info\` mediumtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`device_info\` \`device_info\` mediumtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`app_version\` \`app_version\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`platform\` \`platform\` enum ('ios', 'android') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`coin_address\` \`coin_address\` varchar(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`coin_code\` \`coin_code\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`error\` \`error\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`message\` \`message\` mediumtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`method\` \`method\` varchar(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client_logs\` CHANGE \`title\` \`title\` varchar(256) NOT NULL`);
    }

}
