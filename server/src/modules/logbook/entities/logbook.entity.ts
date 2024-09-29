import { TrackedEntity } from '@/modules/common/models/tracked.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Log } from './log.entity';
import User from '@/modules/users/entities/user.entity';

const LOGBOOK_OWNER_COL = 'ownerId';
const FK_LOGBOOK_OWNER = 'FK_logbook-owner';

@Entity()
export class Logbook extends TrackedEntity {
  constructor() {
    super();
  }
  @Column({ length: 255 })
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

  @OneToMany(() => Log, (l) => l.logbook)
  logs: Log[];

  @ManyToOne(() => User, (u) => u.customLogbooks, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: LOGBOOK_OWNER_COL,
    foreignKeyConstraintName: FK_LOGBOOK_OWNER,
  })
  owner?: User | null;
}
