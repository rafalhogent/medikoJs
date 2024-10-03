import { TrackedEntity } from '@/modules/common/models/tracked.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Log } from './log.entity';
import User from '@/modules/users/entities/user.entity';
import { Type } from 'class-transformer';

export const LOGBOOK_OWNER_COL = 'ownerId';
export const FK_LOGBOOK_OWNER = 'FK_logbook-owner';
export const UQ_LOGBOOK_NAME_OWNER = 'UQ_Logbook_name-ownerId';
export const LOGBOOK_NAME_COL = 'name';

@Unique(UQ_LOGBOOK_NAME_OWNER, [LOGBOOK_OWNER_COL, LOGBOOK_NAME_COL])
@Entity()
export class Logbook extends TrackedEntity {
  constructor() {
    super();
  }
  @Column({ length: 255, name: LOGBOOK_NAME_COL })
  name!: string;

  @Column({ nullable: true, default: null })
  field1?: string;

  @Column({ nullable: true, default: null })
  unit1?: string;

  @Column({ nullable: true, default: null })
  precision1?: number = undefined;

  @Column({ nullable: true, default: null })
  field2?: string;

  @Column({ nullable: true, default: null })
  unit2?: string;

  @Column({ nullable: true, default: null })
  precision2?: number = undefined;

  @Column({ nullable: true, default: null })
  field3?: string;

  @Column({ nullable: true, default: null })
  unit3?: string;

  @Column({ nullable: true, default: null })
  precision3?: number = undefined;

  @Column({ nullable: true, default: null })
  field4?: string;

  @Column({ nullable: true, default: null })
  unit4?: string;

  @Column({ nullable: true, default: null })
  precision4?: number = undefined;

  @Column({ nullable: true, default: null })
  icon?: string;

  @Type(() => Log)
  @OneToMany(() => Log, (l) => l.logbook, { cascade: true })
  logs: Log[];

  @Column()
  [LOGBOOK_OWNER_COL]: number;

  @ManyToOne(() => User, (u) => u.logbooks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: LOGBOOK_OWNER_COL,
    foreignKeyConstraintName: FK_LOGBOOK_OWNER,
  })
  owner?: User | null;
}
