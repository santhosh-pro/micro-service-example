import {MigrationInterface, QueryRunner} from "typeorm";

export class tp1648370517767 implements MigrationInterface {
    name = 'tp1648370517767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`outbox\` ADD \`topic\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`outbox\` DROP COLUMN \`topic\``);
    }

}
