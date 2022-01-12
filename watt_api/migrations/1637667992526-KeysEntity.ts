import {MigrationInterface, QueryRunner} from "typeorm";

export class KeysEntity1637667992526 implements MigrationInterface {
    name = 'KeysEntity1637667992526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`keys\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`public\` varchar(1024) NOT NULL, \`secret\` varchar(1024) NOT NULL, \`default\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`keys\` ADD CONSTRAINT \`FK_7343de75df3b0ac425986de1bab\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`keys\` DROP FOREIGN KEY \`FK_7343de75df3b0ac425986de1bab\``);
        await queryRunner.query(`DROP TABLE \`keys\``);
    }

}
