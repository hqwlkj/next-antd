import { Store } from '@/types/store.interface';

export interface ListResponse<T> {
  total: number;
  pages: number;
  size: number;
  pageNum: number;
  pageSize: number;
  startRow: number;
  endRow: number;
  list: T[];
  storeList: Store[];
}
