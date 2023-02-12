export interface ResponseList<T>{
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data:T[];
}

export interface Contact {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}
