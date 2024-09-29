import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedLogbooks1727637395417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            INSERT INTO mediko.logbook
            (id, name, 
                field1, unit1, precision1, 
                field2, unit2, precision2, 
                field3, unit3, precision3, 
                field4, unit4, precision4, 
                icon, ownerId, createdAt, updatedAt, deletedAt, isDeleted )

            VALUES
            ( '1', 'weight', 
                    'weight', 'kg', null, 
                    null, null, null, 
                    null, null, null, 
                    null, null, null, 
                    null, null, null, null, null, 0),
                    
            ( '2', 'blood pressure', 
                'systolic', null, 0, 
                'diastolic', null, 0, 
                'pulse', null, 0, 
                null, null, null, 
                null, null, null, null, null, 0),
                    
            ( '3', 'temperature', 
                'temperature', '℃', 0, 
                null, null, null, 
                null, null, null, 
                null, null, null, 
                null, null, null, null, null, 0),
                
            ( '4', 'water', 
                'water', 'ml', 0, 
                null, null, null, 
                null, null, null, 
                null, null, null, 
                null, null, null, null, null, 0),
                
            ( '5', 'glucose', 
                'glucose', 'mmol/L', 1, 
                null, null, null, 
                null, null, null, 
                null, null, null, 
                null, null, null, null, null, 0),
                
            ( '6', 'thyroid', 
                'TSH', 'mU/l', 1, 
                'FT4', 'pmol/l', 1, 
                'FT3', 'pmol/l', 1, 
                null, null, null, 
                null, null, null, null, null, 0);
               
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM mediko.logbook')
    }

}
