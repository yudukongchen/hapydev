import React from 'react';
import DataTable from '../DataTable';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { paramsWrapper } from './style';
import RestfulTable from './Restful';
import { DataItem } from '#types/collection';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
  onQueryChange: (newList: DataItem[]) => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange, onQueryChange } = props;

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
    <div className={paramsWrapper}>
      <div className="case-title ">Query 参数</div>
      <DataTable value={value?.parameter} onChange={onQueryChange} />
      <div className="case-title pad-top-10 ">路径变量</div>
      <RestfulTable value={value?.restful} onChange={handleChange.bind(null, 'restful')} />
    </div>
  );
};

export default React.memo(Header);
