import { Injectable } from '@nestjs/common';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sleep } from './entities/sleep.entity';

@Injectable()
export class SleepService {
  constructor(
    @InjectRepository(Sleep)
    private readonly sleepRepo: Repository<Sleep>,
  ) {}

  create(createSleepDto: CreateSleepDto) {
    return 'This action adds a new sleep';
  }

  findAll() {
    return this.sleepRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sleep`;
  }

  update(id: number, updateSleepDto: UpdateSleepDto) {
    return `This action updates a #${id} sleep`;
  }

  remove(id: number) {
    return `This action removes a #${id} sleep`;
  }
}
