import { Type } from 'class-transformer';
import { Column, PrimaryColumn } from 'typeorm';

export class TrackedEntity {
  @PrimaryColumn({length: 36})
  id: string;

  @Type(() => Date)
  @Column({ nullable: true })
  createdAt?: Date | null;

  @Type(() => Date)
  @Column({ nullable: true })
  updatedAt?: Date | null;

  @Type(() => Date)
  @Column({ nullable: true })
  deletedAt?: Date | null = null;

  @Column({ default: false })
  isDeleted?: boolean = false;
}
