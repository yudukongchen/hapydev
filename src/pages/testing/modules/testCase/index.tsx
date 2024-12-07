import React, { useEffect } from 'react';
import { TestCaseWrapper } from './style';
import { theme } from 'antd';
import Headers from './headers';
import { useMemoizedFn, useSafeState, useUpdateEffect } from 'ahooks';
import Process from './process';
import { Testing } from '#types/testing';
import { useDispatch, useSelector } from 'react-redux';
import { initExpandKeys } from '@reducers/testing/expands';
import { isArray } from 'lodash';
import { context } from './context';
import TestDatas from './test-datas';
import TestReports from '../testReports';
import produce from 'immer';
import { getUserConfig, setUserConfig } from '@bll/users';

type Props = {
  value: Testing;
  onChange: (newVal: Testing) => void;
  onSave: () => void;
};

const TestCase: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;

  const expand_keys = useSelector((store: any) => store?.testing?.expands);

  const dispatch = useDispatch();

  const { token } = theme.useToken();
  const [mode, setMode] = useSafeState('process');

  const handleChangeData = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data[key] = newVal;
    });
    onChange(result);
  };

  const handleInitExpandKeys = useMemoizedFn(async () => {
    const expands_testing_data = await getUserConfig(`expands_testing_data${value?.test_id}`);
    if (isArray(expands_testing_data)) {
      dispatch(initExpandKeys(expands_testing_data));
      return;
    }
    dispatch(initExpandKeys([]));
  });

  useEffect(() => {
    handleInitExpandKeys();
  }, [value.test_id]);

  useUpdateEffect(() => {
    const keyList = Object.keys(expand_keys);
    setUserConfig(`expands_testing_data${value?.test_id}`, keyList);
  }, [expand_keys]);

  return (
    <context.Provider value={value}>
      <TestCaseWrapper token={token}>
        <Headers value={value} onChange={onChange} mode={mode} onModeChange={setMode} />
        {mode === 'process' && <Process onSave={onSave} value={value} onChange={onChange} />}
        {mode === 'test_datas' && (
          <TestDatas
            value={value?.data?.iteration_data}
            onChange={handleChangeData.bind(null, 'iteration_data')}
          />
        )}
        {mode === 'reports' && (
          <TestReports project_id={value?.project_id} test_id={value?.test_id} />
        )}
      </TestCaseWrapper>
    </context.Provider>
  );
};

export default TestCase;
