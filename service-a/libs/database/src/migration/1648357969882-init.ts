import {MigrationInterface, QueryRunner} from "typeorm";

export class init1648357969882 implements MigrationInterface {
    name = 'init1648357969882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`created_by\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NOT NULL, \`created_on\` datetime NOT NULL, \`updated_on\` datetime NOT NULL, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
