import {MigrationInterface, QueryRunner} from "typeorm";

export class init1648367383189 implements MigrationInterface {
    name = 'init1648367383189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`created_by\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NOT NULL, \`created_on\` datetime NOT NULL, \`updated_on\` datetime NOT NULL, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inbox\` (\`id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`outbox\` (\`id\` varchar(255) NOT NULL, \`payload\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`outbox\``);
        await queryRunner.query(`DROP TABLE \`inbox\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
