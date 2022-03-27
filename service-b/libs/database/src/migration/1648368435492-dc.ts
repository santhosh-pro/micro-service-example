import {MigrationInterface, QueryRunner} from "typeorm";

export class dc1648368435492 implements MigrationInterface {
    name = 'dc1648368435492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`created_by\` \`created_by\` varchar(255) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`created_by\` \`created_by\` varchar(255) NOT NULL`);
    }

}
