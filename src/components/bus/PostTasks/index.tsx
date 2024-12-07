import React from 'react';
import ScriptBox from '@components/bus/ScriptBox';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';

type Props = {
  value: any[];
  onChange: (newVal: any[]) => void;
};

const PreTasks: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChangeScript = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft[0].data = newVal;
    });

    onChange(result);
  });

  return <ScriptBox scriptType="after" value={value?.[0]?.data} onChange={handleChangeScript} />;
};

export default PreTasks;
