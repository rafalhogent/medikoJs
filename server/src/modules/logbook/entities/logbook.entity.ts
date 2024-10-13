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
import { Transform, Type } from 'class-transformer';

export const LOGBOOK_OWNER_COL = 'ownerId';
export const FK_LOGBOOK_OWNER = 'FK_logbook-owner';
export const UQ_LOGBOOK_NAME_OWNER = 'UQ_Logbook_name-ownerId';
export const LOGBOOK_NAME_COL = 'name';

function transformNullableNumber(obj: any) {
  const x = obj.value;
  return typeof x == 'number' && isFinite(x)
    ? x < 0
      ? 0
      : Math.floor(+x)
    : null;
}

@Unique(UQ_LOGBOOK_NAME_OWNER, [LOGBOOK_OWNER_COL, LOGBOOK_NAME_COL])
@Entity()
export class Logbook extends TrackedEntity {
  constructor() {
    super();
  }
  @Column({ nullable: true, length: 255, name: LOGBOOK_NAME_COL })
  name?: string | null;

  @Column({ nullable: true, default: null })
  field1?: string | null;

  @Column({ nullable: true, default: null })
  unit1?: string | null;

  @Transform(transformNullableNumber)
  @Column({ nullable: true, default: null })
  precision1?: number | null = undefined;

  @Column({ nullable: true, default: null })
  field2?: string | null;

  @Column({ nullable: true, default: null })
  unit2?: string | null;

  @Transform(transformNullableNumber)
  @Column({ nullable: true, default: null })
  precision2?: number | null = undefined;

  @Column({ nullable: true, default: null })
  field3?: string | null;

  @Column({ nullable: true, default: null })
  unit3?: string | null;

  @Transform(transformNullableNumber)
  @Column({ nullable: true, default: null })
  precision3?: number | null = undefined;

  @Column({ nullable: true, default: null })
  field4?: string | null;

  @Column({ nullable: true, default: null })
  unit4?: string | null;

  @Transform(transformNullableNumber)
  @Column({ nullable: true, default: null })
  precision4?: number | null = undefined;

  @Column({ nullable: true, default: null })
  icon?: string | null;

  @Column({ nullable: false, default: false })
  isChoosen: boolean;

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

  update = (updatedLogbook: Logbook) => {
    this.name = updatedLogbook.name;
    this.field1 = updatedLogbook.field1;
    this.field2 = updatedLogbook.field2;
    this.field3 = updatedLogbook.field3;
    this.field4 = updatedLogbook.field4;
    this.unit1 = updatedLogbook.unit1;
    this.unit2 = updatedLogbook.unit2;
    this.unit3 = updatedLogbook.unit3;
    this.unit4 = updatedLogbook.unit4;
    this.precision1 = updatedLogbook.precision1;
    this.precision2 = updatedLogbook.precision2;
    this.precision3 = updatedLogbook.precision3;
    this.precision4 = updatedLogbook.precision4;
    this.isChoosen = updatedLogbook.isChoosen;
    this.updatedAt = updatedLogbook.updatedAt ?? new Date();
  };

  makeDeleted = () => {
    this.name = null;
    this.field1 = null;
    this.field2 = null;
    this.field3 = null;
    this.field4 = null;
    this.unit1 = null;
    this.unit2 = null;
    this.unit3 = null;
    this.unit4 = null;
    this.precision1 = null;
    this.precision2 = null;
    this.precision3 = null;
    this.precision4 = null;
    this.isChoosen = false;
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.createdAt = null;
    this.updatedAt = null;
  };
}
