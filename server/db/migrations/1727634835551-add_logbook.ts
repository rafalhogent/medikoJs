import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogbook1727634835551 implements MigrationInterface {
    name = 'AddLogbook1727634835551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`log\` (
                \`id\` varchar(255) NOT NULL,
                \`moment\` datetime NULL,
                \`value1\` int NULL,
                \`value2\` int NULL,
                \`value3\` int NULL,
                \`value4\` int NULL,
                \`comment\` varchar(255) NULL,
                \`logbookId\` varchar(255) NOT NULL,
                \`ownerId\` int NOT NULL,
                \`createdAt\` datetime NULL,
                \`updatedAt\` datetime NULL,
                \`deletedAt\` datetime NULL,
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`logbook\` (
                \`id\` varchar(255) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`field1\` varchar(255) NULL,
                \`unit1\` varchar(255) NULL,
                \`precision1\` int NULL,
                \`field2\` varchar(255) NULL,
                \`unit2\` varchar(255) NULL,
                \`precision2\` int NULL,
                \`field3\` varchar(255) NULL,
                \`unit3\` varchar(255) NULL,
                \`precision3\` int NULL,
                \`field4\` varchar(255) NULL,
                \`unit4\` varchar(255) NULL,
                \`precision4\` int NULL,
                \`icon\` varchar(255) NULL,
                \`ownerId\` int NULL,
                \`createdAt\` datetime NULL,
                \`updatedAt\` datetime NULL,
                \`deletedAt\` datetime NULL,
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`log\`
            ADD CONSTRAINT \`FK_log-logbook\` FOREIGN KEY (\`logbookId\`) REFERENCES \`logbook\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`log\`
            ADD CONSTRAINT \`FK_log-owner\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`logbook\`
            ADD CONSTRAINT \`FK_logbook-owner\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`logbook\` DROP FOREIGN KEY \`FK_logbook-owner\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_log-owner\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_log-logbook\`
        `);
        await queryRunner.query(`
            DROP TABLE \`logbook\`
        `);
        await queryRunner.query(`
            DROP TABLE \`log\`
        `);
    }

}
