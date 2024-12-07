import { theme } from 'antd';
import { BtnSortWrapper } from './style';
import SvgSort from '@assets/icons/sort.svg?react';
import React from 'react';

type Props = {
  attributes: any;
  listeners: any;
};

const DragHandle: React.FC<Props> = (props) => {
  const { attributes, listeners } = props;

  const { token } = theme.useToken();
  return (
    <BtnSortWrapper token={token} {...attributes} {...listeners}>
      <SvgSort />
    </BtnSortWrapper>
  );
};

export default DragHandle;
