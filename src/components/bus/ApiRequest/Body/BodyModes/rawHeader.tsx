import React from 'react';
import { Button } from 'antd';

type Props = {
  onBeautify: () => void;
  onSimplify: () => void;
};

const RawHeader: React.FC<Props> = (props) => {
  const { onBeautify, onSimplify } = props;

  return (
    <div className="api-example-header" style={{ userSelect: 'none' }}>
      <Button onClick={onBeautify}>美化</Button>
      <Button onClick={onSimplify}>简化</Button>
    </div>
  );
};

export default RawHeader;
