import {MigrationInterface, QueryRunner} from "typeorm";

export class cap1648361027445 implements MigrationInterface {
    name = 'cap1648361027445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`outbox\` (\`id\` varchar(255) NOT NULL, \`payload\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inbox\` (\`id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`inbox\``);
        await queryRunner.query(`DROP TABLE \`outbox\``);
    }

}
