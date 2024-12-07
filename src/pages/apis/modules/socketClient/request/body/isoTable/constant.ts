import DomainVars from './columns/domainVars';
import ItemValue from './columns/itemValue';
import Description from './columns/itemDescription';
import { ISO8583DataItem } from '#types/collection/socketClient';

export const ISO_TABLE_COLUMNS = [
  {
    title: '域定义',
    dataIndex: 'definition',
    enableResize: true,
    width: 150,
    element: DomainVars,
  },
  {
    title: '域值',
    dataIndex: 'value',
    enableResize: true,
    width: 150,
    element: ItemValue,
  },
  {
    title: '描述',
    dataIndex: 'description',
    element: Description,
  },
];

export const DEFAULT_DATA_ITEM: ISO8583DataItem & { is_empty_row: boolean } = {
  description: '',
  is_used: 1,
  name: '',
  value: '',
  definition: '',
  is_empty_row: true,
};
