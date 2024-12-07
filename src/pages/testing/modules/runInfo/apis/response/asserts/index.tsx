import cn from 'classnames';
import { AssertWrapper } from './style';
import { theme } from 'antd';
import React from 'react';
type Props = {
  className?: string;
  asserts: any[];
};

const AssertPanel: React.FC<Props> = (props) => {
  const { className, asserts } = props;
  const { token } = theme.useToken();

  return (
    <AssertWrapper className={className} token={token}>
      {asserts?.map((item, index) => (
        <div key={index} className="asssert-item">
          <div className={cn('item-status', item.result === true ? 'success' : 'failed')}>
            {item.result === true ? '成功' : '失败'}
          </div>
          <div className="item-message">
            <span>{item.description}</span>
            <span className="message">{item.message}</span>
          </div>
        </div>
      ))}
    </AssertWrapper>
  );
};

export default AssertPanel;
