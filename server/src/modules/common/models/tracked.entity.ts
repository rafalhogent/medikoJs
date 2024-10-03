import { Type } from 'class-transformer';
import { Column, PrimaryColumn } from 'typeorm';

export class TrackedEntity {
  @PrimaryColumn()
  id: string;

  @Type(() => Date)
  @Column({ nullable: true })
  createdAt?: Date = new Date();

  @Type(() => Date)
  @Column({ nullable: true })
  updatedAt?: Date = new Date();

  @Type(() => Date)
  @Column({ nullable: true })
  deletedAt?: Date | null = null;

  @Column({ default: false })
  isDeleted?: boolean = false;
}
