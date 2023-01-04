import { IxParams } from '@/shared/typings';

export const isS3Image = (url: string) => {
  return url?.includes('static.pietrastudio.com') ?? false;
};
export function imgix(v: string, params?: IxParams) {
  if (!v || !isS3Image(v)) return v || '';
  const url = new URL(v);
  url.host = 'pietra.imgix.net';
  if (!params?.auto) {
    url.searchParams.append('auto', 'compress,format');
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.append(k, v);
    }
  }
  return url.toString();
}

export const isMobile = () => {
  if (process.browser) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }
  return false;
};
