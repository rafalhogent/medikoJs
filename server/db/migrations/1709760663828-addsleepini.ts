import { MigrationInterface, QueryRunner } from "typeorm";

export class Addsleepini1709760663828 implements MigrationInterface {
    name = 'Addsleepini1709760663828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`interruption\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`date\` datetime NOT NULL,
                \`duration\` int NOT NULL,
                \`note\` varchar(255) NOT NULL,
                \`sleepId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`sleep\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`begin\` datetime NOT NULL,
                \`wakeUp\` datetime NOT NULL,
                \`note\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`interruption\`
            ADD CONSTRAINT \`FK_b7e771a0c4681291582a348f1bc\` FOREIGN KEY (\`sleepId\`) REFERENCES \`sleep\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`interruption\` DROP FOREIGN KEY \`FK_b7e771a0c4681291582a348f1bc\`
        `);
        await queryRunner.query(`
            DROP TABLE \`sleep\`
        `);
        await queryRunner.query(`
            DROP TABLE \`interruption\`
        `);
    }

}
