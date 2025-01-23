import { MigrationInterface, QueryRunner } from "typeorm";

export class LongComment1737588391804 implements MigrationInterface {
    name = 'LongComment1737588391804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`log\` MODIFY \`comment\` VARCHAR(2048)
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`log\` MODIFY \`comment\` VARCHAR(255)
        `);
    }

}
