import React from 'react';
import DataTable from '../DataTable';
import { useMemoizedFn } from 'ahooks';
import { paramsWrapper } from './style';
import useProjectInfo from '@hooks/useProjectInfo';
import { DataItem } from '#types/dataItem';

type Props = {
  value: any;
  onChange: (newVal: DataItem[]) => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const projectInfo = useProjectInfo();

  const handleChange = useMemoizedFn((list) => {
    if (projectInfo?.role !== 6) {
      return;
    }
    onChange(list);
  });

  return (
    <div className={paramsWrapper}>
      <DataTable value={value?.parameter} onChange={handleChange} />
    </div>
  );
};

export default React.memo(Header);
