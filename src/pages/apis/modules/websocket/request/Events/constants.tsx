import ItemName from './columns/itemName';
import ItemDescription from './columns/itemDescription';

export const TABLE_COLUMNS = [
  {
    title: (
      <div className="events-header">
        <span>事件名</span>
        <div>监听</div>
      </div>
    ),
    dataIndex: 'name',
    enableResize: true,
    width: 0.4,
    element: ItemName,
  },
  {
    title: '事件描述',
    align: 'left',
    dataIndex: 'description',
    element: ItemDescription,
  },
];

export const DEFAULT_DATA_ITEM = {
  is_used: 1,
  name: '',
  description: '',
  is_empty_row: true,
};
