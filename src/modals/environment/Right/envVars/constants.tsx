import ItemInput from './columns/itemInput';
import ItemDescription from './columns/itemDescription';
import { VariableItem } from '#types/variables';
import { Tooltip } from 'antd';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';

export const TABLE_COLUMNS = [
  {
    title: '变量名称',
    dataIndex: 'name',
    width: 120,
    enableResize: true,

    element: ItemInput,
  },
  {
    title: (
      <div>
        <span>远程值</span>
        <Tooltip
          title={`“远程值”保存在服务器，作为成员之间同步的初始值，及 Hapydev CLI 运行时使用；本地运行时都是读写“本地值”`}
        >
          <span className="span-icon">
            <SvgQuesstion />
          </span>
        </Tooltip>
      </div>
    ),
    dataIndex: 'value',
    enableResize: true,
    width: 160,
    element: ItemInput,
  },
  {
    title: (
      <div>
        <span>本地值</span>
        <Tooltip title={`“本地值”仅保存在本地，不会同步到服务器，团队成员之间也不会相互同步`}>
          <span className="span-icon">
            <SvgQuesstion />
          </span>
        </Tooltip>
      </div>
    ),
    dataIndex: 'current_value',
    width: 160,
    enableResize: true,
    element: ItemInput,
  },
  {
    title: '变量描述',
    align: 'left',
    dataIndex: 'description',
    element: ItemDescription,
  },
];

export const DEFAULT_DATA_ITEM: VariableItem = {
  name: '',
  value: '',
  current_value: '',
  description: '',
  is_empty_row: true,
};
