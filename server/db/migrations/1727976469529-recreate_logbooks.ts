import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateLogbooks1727976469529 implements MigrationInterface {
    name = 'RecreateLogbooks1727976469529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`log\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` datetime NULL,
                \`updatedAt\` datetime NULL,
                \`deletedAt\` datetime NULL,
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`moment\` datetime NULL,
                \`value1\` double NULL,
                \`value2\` double NULL,
                \`value3\` double NULL,
                \`value4\` double NULL,
                \`comment\` varchar(255) NULL,
                \`logbookId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`logbook\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` datetime NULL,
                \`updatedAt\` datetime NULL,
                \`deletedAt\` datetime NULL,
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
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
                \`isChoosen\` tinyint NOT NULL DEFAULT 0,
                \`ownerId\` int NOT NULL,
                UNIQUE INDEX \`UQ_Logbook_name-ownerId\` (\`ownerId\`, \`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`log\`
            ADD CONSTRAINT \`FK_log-logbook\` FOREIGN KEY (\`logbookId\`) REFERENCES \`logbook\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_log-logbook\`
        `);
        await queryRunner.query(`
            DROP INDEX \`UQ_Logbook_name-ownerId\` ON \`logbook\`
        `);
        await queryRunner.query(`
            DROP TABLE \`logbook\`
        `);
        await queryRunner.query(`
            DROP TABLE \`log\`
        `);
    }

}
