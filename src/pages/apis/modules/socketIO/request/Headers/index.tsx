import React from 'react';
import DataTable from '../DataTable';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { headersWrapper } from './style';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const projectInfo = useProjectInfo();

  const handleChange = useMemoizedFn((key, newVal) => {
    if (projectInfo?.role !== 6) {
      return;
    }
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <div className={headersWrapper}>
      <DataTable value={value?.parameter} onChange={handleChange.bind(null, 'parameter')} />
    </div>
  );
};

export default React.memo(Header);
