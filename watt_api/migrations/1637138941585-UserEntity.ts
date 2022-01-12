import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1637138941585 implements MigrationInterface {
    name = 'UserEntity1637138941585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`binance_public_key\` \`binance_public_key\` varchar(1024) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`binance_secret_key\` \`binance_secret_key\` varchar(1024) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`binance_secret_key\` \`binance_secret_key\` varchar(1024) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`binance_public_key\` \`binance_public_key\` varchar(1024) NOT NULL`);
    }

}
