import axios from '@/shared/axios';
import { useAsync } from 'react-use';

function useBusinessSettingsDisplay<T = any>(key: string) {
  return useAsync(async () => {
    const { data } = await axios.get<T>(`/commons/business-settings/DISPLAY/${key}`);
    return data;
  });
}

export default useBusinessSettingsDisplay;
