export interface Store {
  id: number;
  handle: string;
  title: string;
  avatarUrl: string;
  addressCity: string;
  addressCountry?: any;
  isEnabled: boolean;
}
