import { DataItem } from '#types/dataItem';
import React from 'react';
import Table from '@components/base/table';
import { TABLE_COLUMNS } from './constants';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { tableWrapper } from './style';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: DataItem[];
  onChange: (newVal: DataItem[]) => void;
};
const RestFul: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const projectInfo = useProjectInfo();

  const handleChangeData = useMemoizedFn((rowData: any, rowIndex: number) => {
    if (projectInfo?.role !== 6) {
      return;
    }
    const result = produce(value, (draft) => {
      draft[rowIndex] = rowData;
    });
    onChange(result);
  });

  return (
    <Table
      className={tableWrapper}
      showBorder
      columns={TABLE_COLUMNS}
      data={value}
      onFiledChange={handleChangeData}
    />
  );
};

export default RestFul;
