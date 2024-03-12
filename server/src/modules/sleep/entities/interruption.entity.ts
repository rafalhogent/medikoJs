import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sleep } from './sleep.entity';

@Entity()
export class Interruption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column({ length: 255 })
  note: string;

  @ManyToOne(() => Sleep, (sleep) => sleep.interruptions, {nullable:false})
  sleep: Sleep;
}
