import {MigrationInterface, QueryRunner} from "typeorm";

export class dct1648368668847 implements MigrationInterface {
    name = 'dct1648368668847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`created_on\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`created_on\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`updated_on\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`updated_on\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`updated_on\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`updated_on\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`created_on\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`created_on\` datetime NOT NULL`);
    }

}
