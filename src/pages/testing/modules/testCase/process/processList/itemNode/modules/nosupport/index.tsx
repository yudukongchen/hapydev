import { Button } from 'antd';
import SvgDelete from '@assets/icons/delete.svg?react';
import React from 'react';

type Props = {
  onDelete: () => void;
};
const NoSupport: React.FC<Props> = (props) => {
  const { onDelete } = props;
  return (
    <div className="item-node not-support">
      <div className="error-panel">未支持的类型</div>
      <Button onClick={onDelete} size="small" type="text" icon={<SvgDelete />} />
    </div>
  );
};

export default NoSupport;
