import { Contact } from '@app-core/models';

export interface Group {
  id?: number;
  name: string;
  contactIds: number[];
  contacts?: Contact[];
}
