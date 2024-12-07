import React from 'react';
import { ResizeBarWrapper } from './style';
import { theme } from 'antd';
import { PanelResizeHandle } from 'react-resizable-panels';

type Props = {
  direction: 'horizontal' | 'vertical';
};

const Resizebar: React.FC<Props> = (props) => {
  const { direction } = props;

  const { token } = theme.useToken();
  return (
    <PanelResizeHandle
      style={
        direction === 'horizontal'
          ? { width: 1, height: '100%', position: 'relative' }
          : { height: 1, width: '100%', position: 'relative' }
      }
    >
      <ResizeBarWrapper className={direction} token={token}>
        <div className="resize-bar"></div>
      </ResizeBarWrapper>
    </PanelResizeHandle>
  );
};

export default Resizebar;
