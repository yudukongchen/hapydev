import React, { useMemo } from 'react';
import SortTable from '@components/bus/SortTable';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isArray, isEmpty } from 'lodash';
import { ISO_TABLE_COLUMNS, DEFAULT_DATA_ITEM } from './constant';
import FieldTitle from './columns/fieldTitle';
import FieldItem from './columns/fieldItem';
import { ISO8583DataItem } from '#types/collection/socketClient';
import { defaultTableWrapper } from '@components/themes/table';
import cn from 'classnames';

type DataItem = ISO8583DataItem & { is_empty_row: boolean };
type Props = {
  value: ISO8583DataItem[];
  onChange: (newVal: ISO8583DataItem[]) => void;
};

export const ISOTable: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleFiledChange = useMemoizedFn((rowData: DataItem, rowIndex: number) => {
    const newData = produce<DataItem[]>(value as DataItem[], (draft) => {
      draft[rowIndex] = rowData;
      if (!isEmpty(rowData?.name) || !isEmpty(rowData?.definition) || !isEmpty(rowData?.value)) {
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

  const filedColumn = {
    title: <FieldTitle checkedAll={isCheckedAll} onCheckedAll={handleCheckAllQueryItems} />,
    dataIndex: 'name',
    width: 150,
    enableResize: true,
    element: FieldItem,
  };

  const columnsList = useMemo(() => {
    return [filedColumn, ...ISO_TABLE_COLUMNS];
  }, [isCheckedAll]);

  return (
    <SortTable
      showBorder
      columns={columnsList}
      className={cn('table-panel', defaultTableWrapper)}
      onSortEnd={handleSortList}
      data={tableDataList}
      onFiledChange={handleFiledChange}
      onDeleteRow={handleDeleteRow}
    />
  );
};

export default ISOTable;
