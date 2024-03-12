import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Interruption } from './interruption.entity';

@Entity()
export class Sleep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  begin: Date;

  @Column()
  wakeUp: Date;

  @Column({ length: 255 })
  note: string;

  @OneToMany(() => Interruption, (inter) => inter.sleep, {nullable:true})
  interruptions?: Interruption[];
}
