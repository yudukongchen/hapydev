import { Input, Space } from 'antd';
import React from 'react';
import { Filter } from './type';
import Status from '@components/bus/ApiStatus';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';

type Props = {
  value: Filter;
  onChange: (newVal: Filter) => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <Input
      value={value?.name}
      placeholder="搜索接口/目录/请求地址"
      onChange={(e) => {
        handleChange('name', e.target.value);
      }}
      addonAfter={
        <Status showAll value={value.status} onChange={handleChange.bind(null, 'status')} />
      }
    />
  );
};

export default Header;
