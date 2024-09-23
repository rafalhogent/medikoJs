import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'tokens' })
@Unique('user-client-token', ['clientId', 'userId'])
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 36 })
  clientId: string;

  @Column({ length: 255 })
  value: string;

  @Column({ nullable: true })
  created_at: Date = new Date();

  @Column()
  expires_at: Date;
}
