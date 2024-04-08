import Axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { CreateSleepDto } from 'src/models/sleep/create.sleep.dto';
import { SleepDto } from 'src/models/sleep/sleep.dto';
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAllSleeps = async () => {
  const res = await Axios.get<SleepDto[]>(`${backend_url}/sleep`);
  return plainToInstance(SleepDto, res.data);
};

export const createNewSleep = async (sleepNote: CreateSleepDto) => {
  return await Axios.post<CreateSleepDto>(`${backend_url}/sleep`, sleepNote);
};
