// full api doc see https://docs.imgix.com/apis/rendering
export interface IxParams {
  auto?: string;
  ar?: string;
  crop?: string;
  fit?: string;
  h?: string | number;
  dpr?: string | number;
  q?: string | number;
  'max-h'?: string | number;
  'max-w'?: string | number;
  'min-h'?: string | number;
  'min-w'?: string | number;
  rect?: string;
  w?: string | number;
}
