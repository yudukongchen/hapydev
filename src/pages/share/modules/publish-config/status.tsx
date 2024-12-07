import { Button } from 'antd';
import React from 'react';

type Props = {
  value: any;
  onChange: (newVal) => void;
};

const Status: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="item-case">
      <div className="item-left">
        <div className="case-name">发布状态</div>
        <div className="case-title">
          {value === 1 ? (
            <span className="pubstatus published">已发布</span>
          ) : (
            <span className="pubstatus unpublish">未发布</span>
          )}
        </div>
      </div>
      <div className="item-right">
        {value === 1 ? (
          <Button onClick={onChange.bind(null, -1)}>取消发布</Button>
        ) : (
          <Button type="primary" onClick={onChange.bind(null, 1)}>
            发布
          </Button>
        )}
      </div>
    </div>
  );
};

export default Status;
