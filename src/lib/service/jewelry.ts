import axios from '@/shared/axios';

export async function getJewelrySearchSuggestions(text: string) {
  const res = await axios.get<any>(
    `/app/jewelry/action/suggest-auto-complete?includeStoreSuggests=true&includeCategorySuggests=true&size=4&text=${text}`,
  );
  return res.data;
}
