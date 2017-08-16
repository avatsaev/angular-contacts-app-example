import {Contact} from './contact';

export interface Group {
  id?: number;
  name: string;
  contactIds: number[];
  contacts?: Contact[];
}
