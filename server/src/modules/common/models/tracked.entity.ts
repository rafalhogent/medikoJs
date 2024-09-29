import { Column, PrimaryColumn } from 'typeorm';

export class TrackedEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  createdAt?: Date = new Date();

  @Column({ nullable: true })
  updatedAt?: Date = new Date();

  @Column({ nullable: true })
  deletedAt?: Date | null = null;

  @Column({ default: false })
  isDeleted?: boolean = false;
}
