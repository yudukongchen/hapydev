import React from 'react';
import { LeftPanelWrapper } from './style';
import { theme } from 'antd';
import cn from 'classnames';
import { TAB_LIST } from '../constant';

type Props = {
  activeKey: string;
  onActiveChange: (newVal: string) => void;
};

const Left: React.FC<Props> = (props) => {
  const { activeKey, onActiveChange } = props;

  const { token } = theme.useToken();

  return (
    <LeftPanelWrapper token={token}>
      <div className="big-title">账号设置</div>
      <div className="tab-list">
        {TAB_LIST.map((item) => (
          <div
            onClick={onActiveChange.bind(null, item.key)}
            className={cn('tab-item', { active: activeKey === item.key })}
            key={item.key}
          >
            {item.title}
          </div>
        ))}
      </div>
    </LeftPanelWrapper>
  );
};
export default Left;
