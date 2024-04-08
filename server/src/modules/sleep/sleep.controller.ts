import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SleepService } from './sleep.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';

@Controller('sleep')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  @Post()
  create(@Body() createSleepDto: CreateSleepDto) {
    return this.sleepService.create(createSleepDto);
  }

  @Get()
  findAll() {
    return this.sleepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sleepService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSleepDto: UpdateSleepDto) {
    return this.sleepService.update(+id, updateSleepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sleepService.remove(+id);
  }
}
