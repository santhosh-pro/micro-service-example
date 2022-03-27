import {MigrationInterface, QueryRunner} from "typeorm";

export class dct1648370719579 implements MigrationInterface {
    name = 'dct1648370719579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`outbox\` ADD \`topic\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`outbox\` DROP COLUMN \`topic\``);
    }

}
