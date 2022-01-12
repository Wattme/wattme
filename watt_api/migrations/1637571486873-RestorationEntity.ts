import {MigrationInterface, QueryRunner} from "typeorm";

export class RestorationEntity1637571486873 implements MigrationInterface {
    name = 'RestorationEntity1637571486873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`restorations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(6) NOT NULL, \`confirmed\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`restorations\` ADD CONSTRAINT \`FK_e44e9fe40ddbe7b2439b3300a25\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restorations\` DROP FOREIGN KEY \`FK_e44e9fe40ddbe7b2439b3300a25\``);
        await queryRunner.query(`DROP TABLE \`restorations\``);
    }

}
