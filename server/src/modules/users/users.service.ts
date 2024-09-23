import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { name: Equal(name) } });
  }

  async findById(userId: number) {
    return this.userRepo.findOneBy({ id: Equal(userId) });
  }

  async create(username: string, hashpass: string) {
    const res = this.userRepo.save({
      name: username,
      password: hashpass,
    });
    return res;
  }
}
