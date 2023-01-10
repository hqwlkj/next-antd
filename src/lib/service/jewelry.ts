import axios from '@/shared/axios';
import { AllJewelryQuery, Jewelry } from '@/types/jewelry.interface';
import { ListResponse } from '@/types/web.interface';

export async function getJewelrySearchSuggestions(text: string) {
  const res = await axios.get<any>(
    `/app/jewelry/action/suggest-auto-complete?includeStoreSuggests=true&includeCategorySuggests=true&size=4&text=${text}`,
  );
  return res.data;
}

export async function getAllJewelry(params: AllJewelryQuery) {
  const res = await axios.get<ListResponse<Jewelry>>('/app/jewelry?includeVariantField=false', {
    params,
  });
  return res.data;
}
