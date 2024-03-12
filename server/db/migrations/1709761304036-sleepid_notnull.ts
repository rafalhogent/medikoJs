import { MigrationInterface, QueryRunner } from "typeorm";

export class SleepidNotnull1709761304036 implements MigrationInterface {
    name = 'SleepidNotnull1709761304036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`interruption\` DROP FOREIGN KEY \`FK_b7e771a0c4681291582a348f1bc\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`interruption\` CHANGE \`sleepId\` \`sleepId\` int NOT NULL
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
            ALTER TABLE \`interruption\` CHANGE \`sleepId\` \`sleepId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`interruption\`
            ADD CONSTRAINT \`FK_b7e771a0c4681291582a348f1bc\` FOREIGN KEY (\`sleepId\`) REFERENCES \`sleep\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
