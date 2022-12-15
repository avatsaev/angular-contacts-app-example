

export interface Contact {
  id?: number;
  first_name: string;
  last_name?: string;
  email: string;
  avatar?: string;
}

export interface SupportUrl {
  url: string;
  text: string;
}


export interface ContactPage {
  data: Contact[];
  page: number;
  per_page: number;
  supportUrl: SupportUrl;
  total: number;
  total_pages: number;
}



