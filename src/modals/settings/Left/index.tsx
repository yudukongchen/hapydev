import { isElectron } from '@utils/is';
import React, { useMemo } from 'react';
import { TAB_LIST } from '../constant';
import cn from 'classnames';
import { LeftPanelWrapper } from './style';
import { theme } from 'antd';

type Props = {
  activeKey: string;
  onActiveChange: (newVal: string) => void;
};

const Left: React.FC<Props> = (props) => {
  const { activeKey, onActiveChange } = props;

  const { token } = theme.useToken();

  const computedList = useMemo(() => {
    if (isElectron()) {
      return TAB_LIST;
    }

    return TAB_LIST.filter((item) => item.element !== true);
  }, []);

  return (
    <LeftPanelWrapper token={token}>
      <div className="big-title">设置</div>
      <div className="tab-list">
        {computedList.map((item) => (
          <div
            key={item.key}
            className={cn('tab-item', item.key === activeKey ? 'active' : null)}
            onClick={onActiveChange?.bind(null, item.key)}
          >
            <item.icon />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </LeftPanelWrapper>
  );
};
export default Left;
