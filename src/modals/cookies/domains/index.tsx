import { isElectron } from '@utils/is';
import React, { useMemo } from 'react';
import cn from 'classnames';
import { LeftPanelWrapper } from './style';
import { theme } from 'antd';

type Props = {
  list: string[];
  activeName: string;
  onActiveChange: (newVal: string) => void;
};

const Left: React.FC<Props> = (props) => {
  const { list, activeName, onActiveChange } = props;

  const { token } = theme.useToken();

  return (
    <LeftPanelWrapper token={token}>
      <div className="big-title">Cookie 管理</div>
      <div className="tab-list beautify-scrollbar">
        {list.map((item) => (
          <div
            key={item}
            className={cn('tab-item', item === activeName ? 'active' : null)}
            onClick={onActiveChange?.bind(null, item)}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </LeftPanelWrapper>
  );
};
export default Left;
