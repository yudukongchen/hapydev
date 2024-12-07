import { BaseCollection } from './base';

export interface DocumentCollection extends BaseCollection {
  data: {
    description: string;
  };
}
