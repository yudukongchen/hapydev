import React from 'react';
import DataTable from '../DataTable';
import { useMemoizedFn } from 'ahooks';
import { paramsWrapper } from './style';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const projectInfo = useProjectInfo();

  const handleChange = useMemoizedFn((newVal) => {
    if (projectInfo?.role !== 6) {
      return;
    }
    onChange(newVal);
  });

  return (
    <div className={paramsWrapper}>
      <DataTable value={value} onChange={handleChange} />
    </div>
  );
};

export default React.memo(Header);
