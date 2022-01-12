import {MigrationInterface, QueryRunner} from "typeorm";

export class VerificationEntity1636977139806 implements MigrationInterface {
    name = 'VerificationEntity1636977139806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`verifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(6) NOT NULL, \`confirmed\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`verifications\` ADD CONSTRAINT \`FK_e9a134af366776c651168916616\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verifications\` DROP FOREIGN KEY \`FK_e9a134af366776c651168916616\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`verifications\``);
    }

}
