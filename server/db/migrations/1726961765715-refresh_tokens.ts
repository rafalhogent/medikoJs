import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokens1726961765715 implements MigrationInterface {
    name = 'RefreshTokens1726961765715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`tokens\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userId\` int NOT NULL,
                \`clientId\` varchar(36) NOT NULL,
                \`value\` varchar(255) NOT NULL,
                \`created_at\` datetime NULL,
                \`expires_at\` datetime NOT NULL,
                UNIQUE INDEX \`user-client-token\` (\`clientId\`, \`userId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`user-client-token\` ON \`tokens\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tokens\`
        `);
    }

}
