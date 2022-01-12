import {MigrationInterface, QueryRunner} from "typeorm";

export class RequestLogEntity1636106157154 implements MigrationInterface {
    name = 'RequestLogEntity1636106157154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`request_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(1024) NOT NULL, \`method\` varchar(10) NOT NULL, \`request\` longtext NULL, \`response\` longtext NULL, \`code\` int NULL, \`response_time\` int NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`request_logs\``);
    }

}
