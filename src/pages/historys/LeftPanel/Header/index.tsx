import { SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { headerWrapper } from './style';
import { Button, Flex, Input } from 'antd';
import React from 'react';
import produce from 'immer';
import { useMemoizedFn } from 'ahooks';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};
const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  });

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange('name', e.target.value);
  };

  return (
    <Flex gap={4} className={headerWrapper}>
      <Input
        value={value?.name ?? ''}
        spellCheck={false}
        onChange={handleChangeName}
        style={{ flex: '1' }}
        prefix={<SearchOutlined />}
      />
    </Flex>
  );
};

export default Header;
