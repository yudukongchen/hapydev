import ItemName from './columns/name';
import ItemValue from './columns/value';
import ItemDescription from './columns/description';

export const TABLE_COLUMNS = [
  {
    title: '参数名',
    dataIndex: 'name',
    enableResize: true,
    width: 0.3,
    element: ItemName,
  },
  {
    title: '参数值',
    dataIndex: 'value',
    enableResize: true,
    width: 0.3,
    element: ItemValue,
  },
  {
    title: '参数描述',
    align: 'left',
    dataIndex: 'description',
    element: ItemDescription,
  },
];
