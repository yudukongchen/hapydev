import React from 'react';
import { HeaderWrapper } from './style';
import { theme } from 'antd';
import Projects from './projects';
import Toolbars from './Toolbars';

const Header: React.FC<any> = () => {
  const { token } = theme.useToken();
  return (
    <HeaderWrapper token={token}>
      <Projects />
      <Toolbars />
    </HeaderWrapper>
  );
};

export default Header;
