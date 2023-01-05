import axios from '@/shared/axios';
import { useAsync } from 'react-use';

const useBusinessSettingsDisplay = (key: string) => {
  return useAsync(async () => {
    const res = await axios.get<any>(`/commons/business-settings/DISPLAY/${key}`);
    return res.data;
  });
};

export default useBusinessSettingsDisplay;
