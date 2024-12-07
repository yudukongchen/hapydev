import { theme } from 'antd';
import { ApisWrapper } from './style';
import { BaseCollection } from '#types/collection/base';
import React from 'react';
import { APIOptions } from '../type';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import ApiListPanel from './apilist';
import OptionsPanel from './options';

type Props = {
  apiList: BaseCollection[];
  value: APIOptions;
  onChange: (newVal: APIOptions) => void;
};
const Apis: React.FC<Props> = (props) => {
  const { apiList, value, onChange } = props;
  const { token } = theme.useToken();

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <ApisWrapper token={token}>
      <ApiListPanel
        apiList={apiList}
        value={value?.selectedKeys}
        onChange={handleChange.bind(null, 'selectedKeys')}
        keepPrefixUrl={value?.keepPrefixUrl}
      />
      <OptionsPanel value={value} handleChange={handleChange} />
    </ApisWrapper>
  );
};

export default Apis;
