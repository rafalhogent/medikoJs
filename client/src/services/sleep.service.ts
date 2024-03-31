import  Axios  from "axios";
import { SleepDto } from "src/models/sleep/sleep.dto";
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAllSleeps = async () => {
    const res = (await Axios.get<SleepDto[]>(`${backend_url}/sleep`)).data
    return res;
}