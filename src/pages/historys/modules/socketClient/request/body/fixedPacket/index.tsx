import React, { useMemo } from 'react';
import { FixedPacketDataItem } from '#types/collection/socketClient';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isArray, isEmpty } from 'lodash';
import { DEFAULT_DATA_ITEM } from './constant';
import FieldTitle from './columns/fieldTitle';
import FieldItem from './columns/fieldItem';
import ItemValue from './columns/itemValue';
import ItemDescription from './columns/itemDescription';
import SortTable from '@components/bus/SortTable';
import { defaultTableWrapper } from '@components/themes/table';
import RulesItemHeader from './columns/rulesItem/header';
import RulesItem from './columns/rulesItem';

type DataItem = FixedPacketDataItem & { is_empty_row: boolean };
type Props = {
  value: FixedPacketDataItem[];
  onChange: (newVal: FixedPacketDataItem[]) => void;
};
const FixedPacket: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleFiledChange = useMemoizedFn((rowData: any, rowIndex: number) => {
    const newData = produce<DataItem[]>(value as DataItem[], (draft) => {
      draft[rowIndex] = rowData;
      if (!isEmpty(rowData?.name) || !isEmpty(rowData?.value)) {
        delete draft[rowIndex].is_empty_row;
      }
    });
    onChange(newData);
  });

  const handleSortList = (params) => {
    const oldList = isArray(value) ? value : [];
    const { oldIndex, newIndex } = params;
    if (oldList.length <= 1) {
      return;
    }
    if (oldIndex >= oldList.length || newIndex >= oldList.length) {
      return;
    }
    const dragItem = oldList[oldIndex];
    const newData = produce(value, (draft) => {
      draft.splice(oldIndex, 1);
      draft.splice(newIndex, 0, dragItem);
    });
    onChange(newData);
  };

  const handleDeleteRow = useMemoizedFn((delIndex) => {
    const newData = produce(value, (draft) => {
      draft.splice(delIndex, 1);
    });
    onChange(newData);
  });

  const tableDataList = useMemo(() => {
    if (!isArray(value)) {
      return [{ ...DEFAULT_DATA_ITEM }];
    }
    const hasStatic = value?.some((item: DataItem) => item?.is_empty_row === true);
    if (!hasStatic) {
      return [...value, DEFAULT_DATA_ITEM];
    }
    return value;
  }, [value]);

  const isCheckedAll = value?.every((item) => item?.is_used === 1);

  const handleCheckAllQueryItems = useMemoizedFn((ckdStatus: boolean) => {
    const newData = produce(value, (draft) => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].is_used = ckdStatus === true ? 1 : -1;
      }
    });
    onChange(newData);
  });

  const handleChangeAll = useMemoizedFn((newVal) => {
    const newList = produce(tableDataList, (draft) => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].rules = newVal;
      }
    });
    onChange(newList);
  });

  const columnsList = useMemo(() => {
    return [
      {
        title: <FieldTitle checkedAll={isCheckedAll} onCheckedAll={handleCheckAllQueryItems} />,
        dataIndex: 'name',
        width: 150,
        enableResize: true,
        element: FieldItem,
      },
      {
        title: '参数值',
        dataIndex: 'value',
        enableResize: true,
        width: 150,
        element: ItemValue,
      },
      {
        title: <RulesItemHeader onChangeAll={handleChangeAll} />,
        dataIndex: 'rules',
        enableResize: true,
        width: 250,
        element: RulesItem,
      },
      {
        title: '描述',
        dataIndex: 'description',
        element: ItemDescription,
      },
    ];
  }, [isCheckedAll]);

  return (
    <SortTable
      showBorder
      className={defaultTableWrapper}
      columns={columnsList}
      onSortEnd={handleSortList}
      data={tableDataList}
      onFiledChange={handleFiledChange}
      onDeleteRow={handleDeleteRow}
    />
  );
};
export default FixedPacket;
