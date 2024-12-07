import { Menu, theme } from 'antd';
import { LeftWrapper } from './style';
import { MENU_ITEMS } from './constants';
import React from 'react';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
};
const LeftPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();
  const handleClick = ({ key }) => {
    onChange(key);
  };

  return (
    <LeftWrapper token={token}>
      <Menu
        onClick={handleClick}
        style={{ width: '100%' }}
        defaultSelectedKeys={[value]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        inlineIndent={18}
        mode="inline"
        items={MENU_ITEMS}
      />
    </LeftWrapper>
  );
};

export default LeftPanel;
